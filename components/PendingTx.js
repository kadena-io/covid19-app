import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Linking
} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import PactContext from '../contexts/PactContext'

const PendingTx = () => {

  const pactContext = useContext(PactContext);

  const pending = () => {
    return (
      <View>
        <Text style={{padding: 10}}>{pactContext.txMsg}</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  // https://explorer.chainweb.com/testnet/tx/${pcContext.txData.reqKey}

  const complete = () => {
    return (
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20
        }}>
        <Text style={{paddingBottom: 10}}>{pactContext.txMsg}</Text>
        <Text
          style={{color:"blue", paddingBottom: 20}}
          onPress={() => Linking.openURL(`https://explorer.chainweb.com/testnet/tx/${pactContext.reqKey}`)}>
          View in Block Explorer
        </Text>
        <Button
          style={{paddingBottom: 10}}
          title="Done"
          onPress={() => pactContext.setScreen('home')}
        />
      </View>
    )
  }

  return (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 30, padding: 10}}>Tx Status</Text>
      {pactContext.loading ? pending() : complete()}
    </View>
  )

}

export default PendingTx
