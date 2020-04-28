import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import PactContext from '../contexts/PactContext'

const History = () => {

  const pactContext = useContext(PactContext);

  return (
    <View style={styles.container}>
        <FlatList
          data={[
            { key: 'Devin' },
            { key: 'Dan' },
            { key: 'Dominic' },
            { key: 'Jackson' },
            { key: 'James' },
            { key: 'Joel' },
            { key: 'John' },
            { key: 'Jillian' },
            { key: 'Jimmy' },
            { key: 'Julie' },
          ]}
          renderItem={({ item }) =>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'stretch',
              }}>
              <Text>{item.key}</Text>
                <Text>{item.key}</Text>
                  <Text>{item.key}</Text>
                    <Text>{item.key}</Text>
                      <Text>{item.key}</Text>
            </View>
          }
        />
      </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default History;
