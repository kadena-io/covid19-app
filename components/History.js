import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, FlatList, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PactContext from '../contexts/PactContext'

const History = () => {

  const pactContext = useContext(PactContext);

  const showDate = (item) => {
    const unix = Date.parse(item.test["last-mod-time"]["timep"])
    const d = new Date(unix)
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
  }

  return (
    <View style={styles.container}>
        {(pactContext.scans.length !== 0 ?
        <FlatList
          data={pactContext.scans}
          renderItem={({ item, i }) =>
            <Card containerStyle={{backgroundColor: (item.test["test-end-bh"]["int"] === 0 ? 'grey' : (item.test["result"] === 'positive' ? 'green' : 'red'))}}>
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
                    <Text>{item.test["test-manufacturer"]}</Text>
                      <Text>{item.test["test-model"]}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <Text>{showDate(item)}</Text>
                    <Text
                      style={{color:"blue"}}
                      onPress={() => Linking.openURL(item.url)}>
                      block explorer
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <Text>status:</Text>
                    <Text style={{paddingRight: 10}}>{(item.test["test-end-bh"]["int"] === 0 ? 'administered' : item.test["result"])}</Text>
                  </View>

              </View>
            </Card>
          }
        />
        :
        <View>
          <Text>No Tests Scanned!</Text>
        </View>)}
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
          onPress={() => pactContext.updateScans()}
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
