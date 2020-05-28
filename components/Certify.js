import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import PactContext from '../contexts/PactContext'
import * as SecureStore from 'expo-secure-store';

const Certify = () => {

  const pactContext = useContext(PactContext);

  const [pubKey, setPubKey] = useState("");

  const showPubKey = async () => {
    const kp = await SecureStore.getItemAsync('keypair')
    const pubKey = JSON.parse(kp).publicKey
    console.log(pubKey)
    setPubKey(pubKey)
  }

  useEffect(() => {
    (async () => {
      await showPubKey()
    })();
  }, []);

  return (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 30}}>Signing Key Info</Text>
      <View
        style={{
          paddingBottom: 20,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Text>current public key:</Text>
        <Text style={{paddingRight: 10}}>{pubKey}</Text>
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20
        }}>
        <Button
          style={{padding: 10}}
          onPress={() => pactContext.genSaveKeypair()}
          title="Generate New Keypair"
        />
      </View>
      <Text style={{fontSize: 30, paddingTop: 20}}>Post Health Status</Text>
      <Text style={{paddingBottom: 20}}>Click button to certify you have no covid-19 symptoms on Kadena Mainnet</Text>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20
        }}>
        <Button
          style={{paddingBottom: 10}}
          title="Self Certify Health"
        />
      </View>
    </View>
  )

}

export default Certify
