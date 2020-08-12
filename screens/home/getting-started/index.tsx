import React, { useState, useEffect,useRef } from 'react';
import { View } from 'react-native';
import { Appbar, Text, Button, ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import YoutubePlayer from 'react-native-youtube-iframe';
import {coronaVideoID} from '../../../utils/constants';
import { isNetworkAvailable } from '../../../utils/network';
export const GetingStartedScreen = ({navigation }: any) => {

  const [ready, setReady] = useState(false);
  const [error, setError] = useState();
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef(null);
  useEffect(() => {
    const getPersonalData = async () => {
      try {
        const isConnected = await isNetworkAvailable();
        if (!isConnected) {
          throw new Error("Net") ;
        }
      }     
      catch (e){
        if(e.message =='Net'){
          alert('নেট সংযোগ নেই');
        }

      } 
    }
    getPersonalData();
  }, []);


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() =>  navigation.navigate("Home")}  />
        <Appbar.Content title="ব্যবহার নির্দেশিকা" />
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
          <YoutubePlayer
               ref={playerRef}
              height={450}
              width={350}
              videoId={coronaVideoID}
              play={playing}
              onReady={() => setReady(true)}
              onError={(e: any) => setError(e)}
              onPlaybackQualityChange={() => {}}
              volume={50}
              playbackRate={1}
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