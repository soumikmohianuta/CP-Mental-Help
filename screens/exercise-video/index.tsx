import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Appbar, Text, Button, ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import YouTube from 'react-native-youtube';
import { markExcerciseAsDone } from '../../services/firebase';
import { UserContext } from '../../context';
import { resources } from '../mental-health-exercises/content';
import {setHomeProgressRequire} from  '../../storage';

export const ExerciseVideoScreen = ({ route, navigation }: any) => {
  const { exercise } = route.params;
  const { videoId, name, content_id, order } = exercise;
  const { userName: userId } = useContext(UserContext);

  const [ready, setReady] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState();

  const onChangeState = async (e: any) => {
    if (e.state === 'ended') {
      await markExcerciseAsDone(userId, content_id);
      setCompleted(true);
      setHomeProgressRequire(true);
    }
  }

  const handlePrevious = () => {
    setError(undefined);
    setReady(false);
    navigation.navigate('ExerciseVideo', { exercise: resources[order - 1]});
  }
  const handleNext = () => {
    setHomeProgressRequire(true);
    // TODO: Go to rating and taking test page.
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthExercise')}  />
        <Appbar.Content title={name} />
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
            videoId={videoId}
            play
            onReady={() => setReady(true)}
            onChangeState={(e: any) => onChangeState(e)}
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
          {
            order != resources.length - 1 && 
              <Button
                onPress={handleNext}
                disabled={!completed}
                mode="outlined"
              > 
                Next
              </Button>
          }
          
        </View>
      </ScrollView>
    </>
  )
}