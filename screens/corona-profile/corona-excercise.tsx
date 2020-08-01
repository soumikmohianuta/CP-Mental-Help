import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Appbar, Text, Button, ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import YouTube from 'react-native-youtube';
import {coronaVideoID} from '../../utils/constants';

export const CoronaExerciseVideoScreen = ({ route, navigation }: any) => {

  const [ready, setReady] = useState(false);
  const [error, setError] = useState();

  var MentalProfileState = 0;
 


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() =>  navigation.navigate("Profile",{MentalProfileState})}  />
        <Appbar.Content title="করোনাজয়ীর ইন্টারভিউ" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginTop: 32 }}>
        <View style={{ height: 370 }}>
          {
            !ready &&
              <ActivityIndicator
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 50,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                animating={true}
              />
          }
          <YouTube
            videoId={coronaVideoID}
            play
            onReady={() => setReady(true)}
            onChangeQuality={() => {}}
            onError={e => setError(e)}
            style={{
                alignSelf: 'stretch',
                height: 350,
                display: ready ? 'flex' : 'none'
            }}
          />
        </View>
        {
          error ?
          <Text>আপনার ইন্টারনেট সংযোগটি চেক করুন। ভিডিও চালানো সম্ভব হচ্ছে না</Text>
          : null
        }
       
      </ScrollView>
    </>
  )
}