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

const Security = () => {

  const pactContext = useContext(PactContext);

  useEffect(() => {
    (async () => {
      pactContext.getPubKey()
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
        <Text style={{paddingRight: 10}}>{pactContext.pubKey}</Text>
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
      <Text style={{padding: 10}}>NOTE: You will lose reference to past data unless you save a record of the current public key</Text>
    </View>
  )

}

export default Security
