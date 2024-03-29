import React from 'react';
import { AsyncStorage } from 'react-native';
// import Pact from '../pact/pact-api/pla.js';
// import Pact from '../pact/pact-api/pact-lang-api.js';
// import { Pact } from '../pact/pact-api/pact-lang-api-global.min.js';
// var pact = require('../pact/pact-api/pact-lang-api-global.min.js')
var pact = require('../node_modules/pact-lang-api/pact-lang-api-global.min.js')

// import Pact from 'pact-lang-api'

const Context = React.createContext();

const hosts = ["us1", "us2"]
const createAPIHost = (network, chainId) => `https://${network}.testnet.chainweb.com/chainweb/0.0/testnet04/chain/${chainId}/pact`


export class PactStore extends React.Component {


  state = {
    screen: 'home',
    drawerOpen: false,
    scans: [],
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

  getPollData = async (reqKey, chainId) => {
    try {
      pollRes = await Pact.fetch.poll({requestKeys: [reqKey]}, createAPIHost(hosts[0], chainId.toString()));
      if (pollRes[reqKey].result.status === "success"){
            return pollRes[reqKey]
          } else {
            return "this request key does not exist"
          }
    } catch (e) {
      alert('an error occurred', e)
      return "this request key does not exist"
    }
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
    // const res = await this.getPollData(reqKey, qrData["chainId"].toString())
    // console.log(res);
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
    await this.setState({ scans: pastScans })
    await AsyncStorage.setItem('scans', JSON.stringify(pastScans))
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setScreen: this.setScreen,
          setDrawerOpen: this.setDrawerOpen,
          handleQRScan: this.handleQRScan,
          getSavedScans: this.getSavedScans
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

}

export default Context;
