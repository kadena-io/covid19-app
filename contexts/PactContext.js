import React from 'react';
import { AsyncStorage } from 'react-native';
import Pact from 'pact-lang-api';

const Context = React.createContext();

const hosts = ["us1", "us2"]
const createAPIHost = (network, chainId) => `https://${network}.testnet.chainweb.com/chainweb/0.0/testnet04/chain/${chainId}/pact`


export class PactStore extends React.Component {

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


  state = {
    screen: 'home',
    drawerOpen: false,
    scans: [],
  }



  setScreen = async (name) => {
    await this.setDrawerOpen(false);
    await this.setState({ screen: name });
  }

  setDrawerOpen = async (bool) => {
    await this.setState({ drawerOpen: bool })
  }

  handleQRScan = async (qrData) => {
    const pastScans = this.state.scans.slice()
    console.log(qrData["chainId"])
    const newScan = {
      chainId: qrData["chainId"],
      url: qrData["url"],
      key: Math.floor(Math.random() *  100000000000),
      reqKey:
    }
    // newScan["key"] =
    // pastScans.push(newScan)
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
