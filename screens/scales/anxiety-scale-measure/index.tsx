import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { questions } from './content';
import { QuestionForm } from '../../../components/question-form';
import { setMentalHealthScore } from '../../../services/firebase';
import { UserContext } from '../../../context';
import { SCALE_NAME } from '../../../utils/constants';
import { isNetworkAvailable } from '../../../utils/network';

export const AnxietyScaleMeasureScreen = ({ navigation }: any) => {
  const { userName: userId } = useContext(UserContext);
  
  const handleSubmit = async(score: number) => {
    try{
      const isConnected = await isNetworkAvailable();
      if (isConnected) {
        await setMentalHealthScore(userId, SCALE_NAME.ANXIETY, score);
      }
    
      else{
        throw new Error("Net") ;
      }
    }
    catch (e){
      if(e.message =='Net'){
        alert('ইন্টারনেট সংযোগ নেই,সাবমিট করা যাচ্ছে না');
      }
      else{
        alert('সাবমিট করা যাচ্ছে না');
      }
    }
    finally{
      navigation.navigate('MentalHealthScoreView', { score, scale: SCALE_NAME.ANXIETY });
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title="দুশ্চিতা নির্ণয়" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }}>
        <QuestionForm
          questions={questions}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </>
  )
}