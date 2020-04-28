import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Header, Icon } from 'react-native-elements';
import Drawer from 'react-native-drawer'
import PactContext from '../contexts/PactContext'
import DrawerContent from './DrawerContent';
import Placeholder from './Placeholder';
import QRScanner from './QRScanner';
import History from './History';

const SCREEN_WIDTH = Dimensions.get('window').width;


const Main = () => {

  const pactContext = useContext(PactContext);

  const [drawerOpen, setDrawerOpen] = useState(false)

  const screenToShow = () => {
    if (pactContext.screen === 'home') {
      return <Placeholder />
    }
    if (pactContext.screen === 'scan') {
      return <QRScanner />
    }
    if (pactContext.screen === 'history') {
      return <History />
    }
  }

  return(
  <SafeAreaView style={{ flex: 1 }}>
  <Header
    leftComponent={
      <View>
        <Icon
        name='menu'
        color='#fff'
        onPress={() => pactContext.setDrawerOpen(!pactContext.drawerOpen)}/>
      </View>}
    centerComponent={{ text: 'Kadena Covid-19', style: { color: '#fff', fontSize: 25, fontWeight:'bold' } }}
    rightComponent={
      <View>
        <Icon
        name='home'
        color='#fff'
        onPress={() => pactContext.setScreen('home')}/>
      </View>}
    containerStyle={{
        backgroundColor: '#054F9E',
        justifyContent: 'space-around',
      }}
    />
    <Drawer
        type="overlay"
        open={pactContext.drawerOpen}
        content={<DrawerContent />}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
      >
     <View style={{ flex: 1, backgroundColor: 'white' }}>
       {screenToShow()}
     </View>
     </Drawer>
   </SafeAreaView>
 );
}

export default Main;



const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  infoTypeLabel: {
    fontSize: 15,
    textAlign: 'right',
    color: 'rgba(126,123,138,1)',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: 'white',
    paddingBottom: 10,
  },
});
