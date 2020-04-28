import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PactStore } from "./contexts/PactContext";
import Main from './components/Main'


export default function App() {
  return (
    <PactStore>
      <Main />
    </PactStore>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
