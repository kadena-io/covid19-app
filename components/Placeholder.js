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

const SCREEN_WIDTH = Dimensions.get('window').width;

const Placeholder = () => {

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/kadena.png')}
          style={{
            width: Dimensions.get('window').width - 250,
            height: Dimensions.get('window').width - 250,
            borderRadius: 10,
            marginTop: 100
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 40,
          width: SCREEN_WIDTH - 80,
          marginLeft: 40,
        }}
      >
      <Text
        style={{
          flex: 1,
          fontSize: 15,
          color: 'black',
          marginBottom: 10,
        }}
      >
        INFO
      </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 15,
            color: '#054F9E',
          }}
        >
          Welcome to the Kadena Covid-19 Health Status Tracking App! You can scan a test QR code from adhering manufacturers to start tracking your health records on Kadena's blockchain
        </Text>
      </View>


    </ScrollView>
  )

}

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

export default Placeholder;

//
//
//
// <View
//   style={{
//     flex: 1,
//     flexDirection: 'row',
//     marginTop: 20,
//     marginHorizontal: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }}
// >
// <Text
//   style={{
//     flex: 1,
//     fontSize: 26,
//     color: 'white',
//   }}
// >
//   Theresa
// </Text>
//   <Text
//     style={{
//       flex: 0.5,
//       fontSize: 15,
//       color: 'gray',
//       textAlign: 'left',
//       marginTop: 5,
//     }}
//   >
//     0.8 mi
//   </Text>
//   <Text
//     style={{
//       flex: 1,
//       fontSize: 26,
//       color: 'green',
//       textAlign: 'right',
//     }}
//   >
//     84%
//   </Text>
// </View>
// <View
//   style={{
//     flex: 1,
//     marginTop: 20,
//     width: SCREEN_WIDTH - 80,
//     marginLeft: 40,
//   }}
// >
//   <Text
//     style={{
//       flex: 1,
//       fontSize: 15,
//       color: 'white',
//     }}
//   >
//     100% Italian, fun loving, affectionate, young lady who knows
//     what it takes to make a relationship work.
//   </Text>
// </View>
// <View style={{ flex: 1, marginTop: 30 }}>
//   <Text
//     style={{
//       flex: 1,
//       fontSize: 15,
//       color: 'rgba(216, 121, 112, 1)',
//       marginLeft: 40,
//     }}
//   >
//     INTERESTS
//   </Text>
//   <View style={{ flex: 1, width: SCREEN_WIDTH, marginTop: 20 }}>
//     <ScrollView
//       style={{ flex: 1 }}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//     >
//     </ScrollView>
//   </View>
// </View>
// <View style={{ flex: 1, marginTop: 30 }}>
//   <Text
//     style={{
//       flex: 1,
//       fontSize: 15,
//       color: 'rgba(216, 121, 112, 1)',
//       marginLeft: 40,
//     }}
//   >
//     INFO
//   </Text>
//   <View
//     style={{
//       flex: 1,
//       flexDirection: 'row',
//       marginTop: 20,
//       marginHorizontal: 30,
//     }}
//   >
//     <View style={{ flex: 1, flexDirection: 'row' }}>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.infoTypeLabel}>Age</Text>
//         <Text style={styles.infoTypeLabel}>Height</Text>
//         <Text style={styles.infoTypeLabel}>Ethnicity</Text>
//         <Text style={styles.infoTypeLabel}>Sign</Text>
//         <Text style={styles.infoTypeLabel}>Religion</Text>
//       </View>
//       <View style={{ flex: 1, marginLeft: 10 }}>
//         <Text style={styles.infoAnswerLabel}>26</Text>
//         <Text style={styles.infoAnswerLabel}>5'4"</Text>
//         <Text style={styles.infoAnswerLabel}>White</Text>
//         <Text style={styles.infoAnswerLabel}>Pisces</Text>
//         <Text style={styles.infoAnswerLabel}>Catholic</Text>
//       </View>
//     </View>
//     <View style={{ flex: 1, flexDirection: 'row' }}>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.infoTypeLabel}>Body Type</Text>
//         <Text style={styles.infoTypeLabel}>Diet</Text>
//         <Text style={styles.infoTypeLabel}>Smoke</Text>
//         <Text style={styles.infoTypeLabel}>Drink</Text>
//         <Text style={styles.infoTypeLabel}>Drugs</Text>
//       </View>
//       <View style={{ flex: 1, marginLeft: 10, marginRight: -20 }}>
//         <Text style={styles.infoAnswerLabel}>Fit</Text>
//         <Text style={styles.infoAnswerLabel}>Vegan</Text>
//         <Text style={styles.infoAnswerLabel}>No</Text>
//         <Text style={styles.infoAnswerLabel}>No</Text>
//         <Text style={styles.infoAnswerLabel}>Never</Text>
//       </View>
//     </View>
//   </View>
// </View>
