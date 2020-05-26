import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, FlatList, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PactContext from '../contexts/PactContext'

const History = () => {

  const pactContext = useContext(PactContext);

  return (
    <View style={styles.container}>
        <FlatList
          data={pactContext.scans}
          renderItem={({ item, i }) =>
            <Card containerStyle={{backgroundColor: 'green'}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <Text>maunfacturer</Text>
                      <Text>model</Text>
                  </View>
                  <Text
                    style={{color:"blue"}}
                    onPress={() => Linking.openURL(item.url)}>
                    link
                  </Text>
                  <Text style={{paddingRight: 10}}>{item.chainId}</Text>
              </View>
            </Card>
          }
        />
        <Button
          style={{paddingTop: 20}}
          icon={
            <Icon
              name="refresh"
              size={15}
              color="white"
              style={{padding: 10}}
            />
          }
          title="Refresh"
        />
      </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    padding: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default History;
