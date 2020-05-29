import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import PactContext from '../contexts/PactContext'

const DrawerContent = () => {

  const pactContext = useContext(PactContext);

  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri }}
        />
        <Text style={styles.name}>Steve Nojobs</Text>
      </View>

      <Text
        onPress={() => pactContext.setScreen('scan')}
        style={styles.item}
      >
        Scan Test QR
      </Text>

      <Text
        onPress={() => pactContext.setScreen('certify')}
        style={styles.item}
      >
        Self-Certify
      </Text>

      <Text
        onPress={() => pactContext.setScreen('history')}
        style={styles.item}
      >
        History
      </Text>

      <Text
        onPress={() => pactContext.setScreen('security')}
        style={styles.item}
      >
        Security
      </Text>
    </ScrollView>
  )

}

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width / 2,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
    color: 'black'
  },
  item: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 15,
    color: '#054F9E'
  },
});

export default DrawerContent;
