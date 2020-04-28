import React from 'react';
import Pact from 'pact-lang-api';

const Context = React.createContext();

const hosts = ["us1", "us2"]
const createAPIHost = (network, chainId) => `https://${network}.testnet.chainweb.com/chainweb/0.0/testnet04/chain/${chainId}/pact`

export class PactStore extends React.Component {

  state = {
    screen: 'home',
    drawerOpen: false
  }

  setScreen = async (name) => {
    await this.setDrawerOpen(false);
    await this.setState({ screen: name });
  }

  setDrawerOpen = async (bool) => {
    await this.setState({ drawerOpen: bool })
  }

  handleQRScan = async (qrData) => {

  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setScreen: this.setScreen,
          setDrawerOpen: this.setDrawerOpen,
          handleQRScan: this.handleQRScan
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

}

export default Context;
