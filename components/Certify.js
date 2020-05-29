import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';
import { Button, Header, Icon, CheckBox, Input } from 'react-native-elements';
import PactContext from '../contexts/PactContext'
import * as SecureStore from 'expo-secure-store';

const Certify = () => {

  const pactContext = useContext(PactContext);

  const [cough, setCough] = useState(false);
  const [fever, setFever] = useState(false);
  const [breath, setBreath] = useState(false);
  const [chills, setChills] = useState(false);
  const [muscle, setMuscle] = useState(false);
  const [fatigue, setFatigue] = useState(false);
  const [headache, setHeadache] = useState(false);
  const [throat, setThroat] = useState(false);
  const [smell, setSmell] = useState(false);
  const [comment, setComment] = useState("");

  const show = () => {
    if (pactContext.pubKey.length === 64) {
      return (
        <ScrollView style={{padding: 10}}>
          <Text style={{fontSize: 30, paddingTop: 20, paddingBottom: 10}}>Post Health Status</Text>
          <Text style={{paddingBottom: 10}}>Check boxes and register your symptoms on Kadena Mainnet</Text>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 30
            }}>
            <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 80}}>symptom</Text>
            <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 40}}>yes</Text>
            <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 40}}>no</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 30
            }}>
            <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 40, width: 150}}>cough</Text>
            <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={cough}
              onPress={() => setCough(!cough)}
            />
            <CheckBox
              style={{color: 'red'}}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!cough}
              onPress={() => setCough(!cough)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 30
            }}>
            <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 40, width: 150}}>fever</Text>
            <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={fever}
              onPress={() => setFever(!fever)}
            />
            <CheckBox
              style={{color: 'red'}}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!fever}
              onPress={() => setFever(!fever)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 30
            }}>
              <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 40, width: 150}}>breath shortness</Text>
            <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={breath}
              onPress={() => setBreath(!breath)}
            />
            <CheckBox
              style={{color: 'red'}}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!breath}
              onPress={() => setBreath(!breath)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 30
            }}>
              <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 40, width: 150}}>chills</Text>
            <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={chills}
              onPress={() => setChills(!chills)}
            />
            <CheckBox
              style={{color: 'red'}}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!chills}
              onPress={() => setChills(!chills)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 30
            }}>
              <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 40, width: 150}}>muscle or joint pain</Text>
            <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={muscle}
              onPress={() => setMuscle(!muscle)}
            />
            <CheckBox
              style={{color: 'red'}}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!muscle}
              onPress={() => setMuscle(!muscle)}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 30
            }}>
              <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 40, width: 150}}>fatigue</Text>
            <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={fatigue}
              onPress={() => setFatigue(!fatigue)}
            />
            <CheckBox
              style={{color: 'red'}}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!fatigue}
              onPress={() => setFatigue(!fatigue)}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 30
            }}>
              <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 40, width: 150}}>headache</Text>
            <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={headache}
              onPress={() => setHeadache(!headache)}
            />
            <CheckBox
              style={{color: 'red'}}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!headache}
              onPress={() => setHeadache(!headache)}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 30
            }}>
              <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 40, width: 150}}>sore throat</Text>
            <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={throat}
              onPress={() => setThroat(!throat)}
            />
            <CheckBox
              style={{color: 'red'}}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!throat}
              onPress={() => setThroat(!throat)}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 30
            }}>
              <Text style={{fontSize: 20, paddingTop: 11, paddingRight: 40, width: 150}}>loss of taste and smell</Text>
            <CheckBox
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={smell}
              onPress={() => setSmell(!smell)}
            />
            <CheckBox
              style={{color: 'red'}}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!smell}
              onPress={() => setSmell(!smell)}
            />
          </View>

          <View
            style={{
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 0,
              paddingBottom: 20
            }}
          >
            <Input
              onChangeText={value => setComment(value)}
              placeholder='Optional Comment'
            />
          </View>

          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 60,
              paddingTop: 10
            }}>
            <Button
              style={{paddingBottom: 10}}
              title="Self Certify Health"
              onPress={() => pactContext.selfCertify({
                    "cough": cough,
                    "fever": fever,
                    "breath-shortness": breath,
                    "chills": chills,
                    "muscle-pain": muscle,
                    "fatigue": fatigue,
                    "headache": headache,
                    "sore-throat": throat,
                    "loss-taste-smell": smell,
                    "comment": comment,
              })}
            />
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View style={{padding: 10}}>
          <Text style={{fontSize: 30, paddingTop: 20, paddingBottom: 10}}>Please Register Device</Text>
          <Text style={{paddingBottom: 10}}>Go to 'Security' tab to generate and register yourself on Kadena mainnet!</Text>
        </View>
      )
    }
  }

  return (
    show()
  )

}

export default Certify
