import React, { useState, useContext,useRef } from 'react';
import { View } from 'react-native';
import { Appbar, Text, Button, ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { markExcerciseAsDone } from '../../services/firebase';
import { UserContext } from '../../context';
import { resources } from '../mental-health-exercises/content';
import {setHomeProgressRequire} from  '../../storage';
import YoutubePlayer from 'react-native-youtube-iframe';
export const ExerciseVideoScreen = ({ route, navigation }: any) => {
  const { exercise } = route.params;
  const { videoId, name, content_id, order } = exercise;
  const { userName: userId } = useContext(UserContext);
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);
  //const [completed, setCompleted] = useState(false);
  const [error, setError] = useState();
  const [playing, setPlaying] = useState(true);
  
  const onChangeState = async (e: any) => {

    if (e=='ended') {
      console.log(e.state)
      await markExcerciseAsDone(userId, content_id);
      // setCompleted(true);
      setHomeProgressRequire(true);
      navigation.navigate('ExcerciseStateScreen', {
        exercise: resources[order]
      })
     // setCompleted(false);
    }
  }

  const handlePrevious = () => {
    setError(undefined);
    setReady(false);
    navigation.navigate('ExerciseVideo', { exercise: resources[order - 1]});
  }
  const handleNext = () => {
    setHomeProgressRequire(true);
    navigation.navigate('ExcerciseStateScreen', {
      exercise: resources[order]
    })
    setCompleted(false);
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthExercise')}  />
        <Appbar.Content title={name} />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginTop: 32 }}>
        <View style={{ height: 450 , alignItems: 'center'}}>
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
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
                animating={true}
              />
          }
          <YoutubePlayer
               ref={playerRef}
              height={450}
              width={380}
              videoId={videoId}
              play={playing}
              onChangeState={(e: any) => onChangeState(e)}
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12
          }}
        >
          <Button
            onPress={handlePrevious}
            mode="outlined"
            disabled={order === 0}
          >
            Previous
          </Button>
          {/* {
            order != resources.length - 1 && 
              <Button
                onPress={handleNext}
                disabled={!completed}
                mode="outlined"
              > 
                Next
              </Button>
          }
           */}
        </View>
      </ScrollView>
    </>
  )
}