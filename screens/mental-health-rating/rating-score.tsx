import React, { useEffect, useState, useContext } from 'react';
import { Appbar, Text, Headline, Button, Paragraph, Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ScoreCard from '../../components/scorecard';
import { View } from 'react-native';
import { setMentalHealthExcercise, getMentalHealthExcercise } from '../../services/firebase';
import { socreMessage } from './contents';
import { SCALE_MAX_VALUE, getLevelByScore } from '../../utils/scale';
import { isExcerciseTaken, getExerciseList, EXERCISE_STATUS } from '../../utils/exercise';
import { UserContext } from '../../context';
import { SCALE_NAME_MAP } from '../../utils/constants';

export const MentalRatingScoreViewScreen = ({ route, navigation }: any) => {
  const [excerciseStatus, setExcerciseStatus] = useState('');
  const { score, scale } = route.params;


  const onStart = () => {

    navigation.navigate('MentalHealthMeasureList');
  }


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')}  />
        <Appbar.Content title="মানসিক স্বাস্থ্য" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginTop: 32 }}>
      <View style={{
              flex: 1, 
              alignItems: 'center',
              justifyContent: 'center'
                }}>
        <Headline> মানসিক স্বাস্থ্য মূল্যায়ন</Headline> 
        </View>

        <ScoreCard
          size={256}
          defaultPos={score}
          max={100}
        >
          <Text style={{ fontSize: 76 }}>
            {score}
          </Text>
        </ScoreCard>

        <Card elevation={5} style={{ margin: 12, borderRadius: 5,marginTop: 10 }}>
                  
                  <Card.Content style={{ margin: 12, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
      
            <Paragraph  style={{textAlign: 'justify', fontSize: 20}}>{socreMessage}</Paragraph>
      
                  </Card.Content>
                        
          </Card>
        <Button mode="contained" onPress={onStart}>পরিমাপ শুরু করুন</Button>
          
        
      </ScrollView>
    </>
  )
}