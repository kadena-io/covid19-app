import React from 'react';
import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
var pact = require('../node_modules/pact-lang-api/pact-lang-api-global.min.js')


const Context = React.createContext();

const hosts = ["us1", "us2"]
const createAPIHost = (network, chainId) => `https://${network}.testnet.chainweb.com/chainweb/0.0/testnet04/chain/${chainId}/pact`

const adminKeys = {
  publicKey: "02f04ea6376d707cf3ba5e15b984fbbfdac604651fe89da6e4e7e1f455f87537",
  secretKey: "a5cec6bc530dbab5aea35c83ebce0b4c9ca4c52579dfa13da3867f02d95e005f"
}


export class PactStore extends React.Component {


  state = {
    screen: 'home',
    drawerOpen: false,
    scans: [],
    loading: false,
    txMsg: "",
    reqKey: "",
    pubKey: ""
  }

  getPubKey = async () => {
    const kp = await SecureStore.getItemAsync('keypair')
    const pubKey = JSON.parse(kp).publicKey
    await this.setState({ pubKey: pubKey })
  }


  wait = async (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
  }

  getSavedScans = async () => {
    let scans = await AsyncStorage.getItem('scans');
    console.log('init', scans)
    scans = JSON.parse(scans)
    console.log('init', scans)
    if (scans === null) {
      scans = [];
      await AsyncStorage.setItem('scans', JSON.stringify([]));
    }
    await this.setState({ scans: scans })
  }


  setScreen = async (name) => {
    await this.setDrawerOpen(false);
    await this.setState({ screen: name });
  }

  setDrawerOpen = async (bool) => {
    await this.setState({ drawerOpen: bool })
  }


  getTest = async (pubKey, chainId) => {
    console.log(Pact, "s")
    try {
      const dummyKP = Pact.crypto.genKeyPair();
      console.log(dummyKP)
      const res = await Pact.fetch.local({
          networkId: "testnet04",
          // pactCode:`(user.covid.get-record ${JSON.stringify(pubKey)})`,
          pactCode: `(user.covid.get-record ${JSON.stringify(pubKey)})`,
          keyPairs: [{...dummyKP, clist: {name: "coin.GAS", args: []}}],
          meta: Pact.lang.mkMeta("dummy-local",chainId,0.00000001,10000,(Math.round((new Date).getTime()/1000)-15), 28800)}, createAPIHost(hosts[0], chainId))
      if (res.result.status === "success") {
        return res.result.data;
      } else {
        return {}
      }
    } catch (e) {
      console.log(e)
      alert(`an error occurred`)
      return {}
    }
}

  handleQRScan = async (qrData) => {
    const pastScans = this.state.scans.slice()
    console.log(qrData["chainId"])
    let reqKey = qrData["url"].split("").reverse().join("");
    const ci = qrData["chainId"].toString()
    reqKey = reqKey.substring(0, reqKey.indexOf("/")).split("").reverse().join("")
    let test = await this.getTest(qrData["pubKey"], ci)
    console.log(test)
    const newScan = {
      chainId: ci,
      url: qrData["url"],
      pubKey: qrData["pubKey"],
      key: Math.floor(Math.random() *  100000000000),
      reqKey: reqKey,
      test: test
    }
    pastScans.push(newScan);

    await AsyncStorage.setItem('scans', JSON.stringify(pastScans))
    await this.setState({ scans: pastScans, screen: 'history' })
  }

  //refresh status of scans
  updateScans = async () => {
    const pastScans = this.state.scans.slice()
    for (let i = 0; i < pastScans.length; i++) {
      if (pastScans[i]['test']['result'] !== "") {
        updatedTests.push(pastScans[i])
      } else {
        const updatedTest = await this.getTest(pastScans[i].pubKey, pastScans[i].chainId)
        pastScans[i].test = updatedTest
      }
    }
    await this.setState({ scans: pastScans })
    await AsyncStorage.setItem('scans', JSON.stringify(pastScans))
  }

  authUser = async () => {
    const auth = await LocalAuthentication.authenticateAsync();
    if (auth.success === true) {
      return true;
    } else {
      alert("authentification unsuccessfull");
      return false;
    }
  }



  genSaveKeypair = async () => {
    const authSuccess = await this.authUser();
    if (authSuccess) {
    await this.setState({ loading: true, screen: 'pending', txMsg: 'Your transaction is being mined on kadena mainnet...' })
    const kp = Pact.crypto.genKeyPair();
    const chainId = kp.publicKey.replace(/\D/g,'')[0];
    const reqKey = await Pact.fetch.send({
        networkId: "testnet04",
        pactCode:`(user.covid-app.register-user ${JSON.stringify(kp.publicKey)} "20-40" "male" "USA" "11249")`,
        keyPairs: [{...adminKeys, clist: {name: "coin.GAS", args: []}}, {publicKey: kp.publicKey, secretKey: kp.secretKey, clist: []}],
        envData: {"ks": {"pred": "keys-all", "keys": [kp.publicKey]}},
        meta: Pact.lang.mkMeta("covid-app-admin",chainId,0.00000001,10000,(Math.round((new Date).getTime()/1000)-15), 28800)}, createAPIHost(hosts[0], chainId));
        if (reqKey) {
          console.log(reqKey)
          //check kadena tx status every 10 seconds until we get a response (success or fail)
          var time = 180;
          var pollRes;
          while (time > 0) {
            await this.wait(10000);
            pollRes = await Pact.fetch.poll({requestKeys: [reqKey.requestKeys[0]]}, createAPIHost(hosts[0], chainId));
            if (Object.keys(pollRes).length === 0) {
              console.log('no return poll');
              console.log(pollRes)
              time = time - 10
            } else {
              console.log(pollRes);
              time = 0;
            }
          }
          //tx successful
          if (pollRes[reqKey.requestKeys[0]].result.status === "success"){
            console.log('tx success')
            console.log(pollRes[reqKey.requestKeys[0]])
            await SecureStore.setItemAsync('keypair', JSON.stringify(kp));
            await this.setState({
              loading: false,
              txMsg: 'Your transaction was successfully permanently recorded on Kadena mainnet!',
              reqKey: reqKey.requestKeys[0]
            })
          //tx unsuccessful
          } else {
            console.log('tx fail')
            console.log(pollRes[reqKey.requestKeys[0]])
            await this.setState({
              loading: false,
              txMsg: 'There was a problem processing your transaction on Kadena mainnet, please try again...',
              reqKey: reqKey.requestKeys[0]
            })
          }
        } else {
          console.log('validation fail')
          await this.setState({
            loading: false,
            txMsg: 'There was a problem processing your transaction on Kadena mainnet, please try again...',
            reqKey: ""
          })
        }
      }
  }

  selfCertify = async (certObj) => {
    const authSuccess = await this.authUser();
    if (authSuccess) {
      await this.setState({ loading: true, screen: 'pending', txMsg: 'Your transaction is being mined on kadena mainnet...' })
      const kpStr = await SecureStore.getItemAsync('keypair');
      const kp = JSON.parse(kpStr);
      const chainId = kp.publicKey.replace(/\D/g,'')[0];
      //add random date for pact obj structure
      certObj["date"] = {"timep": "2050-07-22T12:00:00.0Z"}
      const reqKey = await Pact.fetch.send({
          networkId: "testnet04",
          pactCode:`(user.covid-app.self-certify ${JSON.stringify(kp.publicKey)} (read-msg "obj"))`,
          keyPairs: [{...adminKeys, clist: {name: "coin.GAS", args: []}}, {publicKey: kp.publicKey, secretKey: kp.secretKey, clist: {name: "user.covid-app.REGISTERED-USER", args: [kp.publicKey]}}],
          envData: {"obj": certObj},
          meta: Pact.lang.mkMeta("covid-app-admin",chainId,0.00000001,10000,(Math.round((new Date).getTime()/1000)-15), 28800)}, createAPIHost(hosts[0], chainId));
          if (reqKey) {
            console.log(reqKey)
            //check kadena tx status every 10 seconds until we get a response (success or fail)
            var time = 180;
            var pollRes;
            while (time > 0) {
              await this.wait(10000);
              pollRes = await Pact.fetch.poll({requestKeys: [reqKey.requestKeys[0]]}, createAPIHost(hosts[0], chainId));
              if (Object.keys(pollRes).length === 0) {
                console.log('no return poll');
                console.log(pollRes)
                time = time - 10
              } else {
                console.log(pollRes);
                time = 0;
              }
            }
            //tx successful
            if (pollRes[reqKey.requestKeys[0]].result.status === "success"){
              console.log('tx success')
              console.log(pollRes[reqKey.requestKeys[0]])
              await SecureStore.setItemAsync('keypair', JSON.stringify(kp));
              await this.setState({
                loading: false,
                txMsg: 'Your transaction was successfully permanently recorded on Kadena mainnet!',
                reqKey: reqKey.requestKeys[0]
              })
            //tx unsuccessful
            } else {
              console.log('tx fail')
              console.log(pollRes[reqKey.requestKeys[0]])
              await this.setState({
                loading: false,
                txMsg: 'There was a problem processing your transaction on Kadena mainnet, please try again...',
                reqKey: reqKey.requestKeys[0]
              })
            }
          } else {
            console.log('validation fail')
            await this.setState({
              loading: false,
              txMsg: 'There was a problem processing your transaction on Kadena mainnet, please try again...',
              reqKey: ""
            })
          }
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setScreen: this.setScreen,
          setDrawerOpen: this.setDrawerOpen,
          handleQRScan: this.handleQRScan,
          getSavedScans: this.getSavedScans,
          updateScans: this.updateScans,
          genSaveKeypair: this.genSaveKeypair,
          selfCertify: this.selfCertify,
          getPubKey: this.getPubKey
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

}

export default Context;
