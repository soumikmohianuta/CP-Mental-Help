import React, { useEffect, useState } from 'react';
import { List, Card, ActivityIndicator, Appbar, Button, Headline, Paragraph,Text } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { checkMentalExaminationExists } from '../../services/firebase';
import {UserContext} from '../../context';
import {getUserInfo} from '../../storage';
import {exerciseStatusToContentMap,MENTAL_HEALTH_STATUS_TITLE,MENTAL_HEALTH_JUDGE_SECTIONS } from './content';
import { getMentalHealthExcercise } from '../../services/firebase';
import { isExcerciseTaken } from '../../utils/exercise';
import CircularProgress from '../../components/percentage-circle';
const { Navigator, Screen } = createStackNavigator();


export const ExcerciseStatusScreen = ({route, navigation }: any) => {
  const [mentalStateTitle, SetmentalStateTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [isExcersieOn, setIsExcersieOn] = useState(false);
  const [content,SetContent]  = useState(exerciseStatusToContentMap['disabled']);
  const {userName} = React.useContext(UserContext);
  const { progressStaus } = route.params;
  const { isProgess } = route.params;
  const setProfileState= async (mentalExamState:any) =>{

    MENTAL_HEALTH_JUDGE_SECTIONS[0].iconName =  mentalExamState.ghq ?'check':'cancel';
    MENTAL_HEALTH_JUDGE_SECTIONS[1].iconName =  mentalExamState.pss ?'check':'cancel';
    MENTAL_HEALTH_JUDGE_SECTIONS[2].iconName =  mentalExamState.anxiety ?'check':'cancel';

    // profileState[3] indicates if healthStatus Ever done or not
    if(mentalExamState.mentalstatemeasure){
        SetmentalStateTitle(MENTAL_HEALTH_STATUS_TITLE.done.title);
      // Check any scale is complete or not
        if(mentalExamState.ghq || mentalExamState.pss  || mentalExamState.anxiety ){
            setIsExcersieOn(true);
            const curlist = await getMentalHealthExcercise(userName);
            if(progressStaus==0){
              SetContent(exerciseStatusToContentMap['never']);
            }
            else if(progressStaus==100){
              SetContent(exerciseStatusToContentMap['completed']);
            }
            else{
              SetContent(exerciseStatusToContentMap['inprogress']);
            }
            // const excersiseStatus = isExcerciseTaken(curlist);
            // SetContent(exerciseStatusToContentMap[excersiseStatus]);
        }
    }
    else{
        SetmentalStateTitle(MENTAL_HEALTH_STATUS_TITLE.notDone.title);
    }
 
  }
  


  useEffect(() => {
    const getPersonalData = async () => {
      try {
        const mentalExamState = await checkMentalExaminationExists(userName);
        setProfileState(mentalExamState);
 


      } catch(e) {
        alert('ব্যক্তিগত তথ্য দেখানো যাচ্ছে না');
      } finally {
        setLoading(false);
      }
    }
    getPersonalData();
  }, []);

  const onStart = async () => {

    navigation.navigate('MentalHealthExercise', { navigateTo: 'Home'});
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')}  />
        <Appbar.Content title="মানসিক স্বাস্থ্য পরিমাপের অবস্থা" />
      </Appbar.Header>
      <ScrollView>
      {
        isProgess? <CircularProgress
        size={180}
        defaultPos={progressStaus}
      >
        <Text style={{ fontSize: 55}}>
          {progressStaus}%
        </Text>
      </CircularProgress> :  <Headline style={{ margin: 12, borderRadius: 5,marginTop: 25 }}>{content.title}</Headline>
      }
      <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title="আপনার মানসিক অবস্থার মূল্যায়ন" />
          <Card.Actions>
              <Button onPress={() => { navigation.navigate('MentalHealthRating', { navigateTo: 'Home'});}}>{mentalStateTitle}</Button>
            </Card.Actions>
      </Card>


        <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title="মানসিক স্বাস্থ্য পরীক্ষণের অবস্থা" />
          <Card.Content>
            {
              MENTAL_HEALTH_JUDGE_SECTIONS.map(({ name, route, iconName }) => (
                <List.Item
                  title={name}
                  right={props => <List.Icon {...props} icon={iconName} />}
                  onPress={() => { navigation.navigate(route)}}
                />
              ))
            }
          </Card.Content>
        </Card>

        { isExcersieOn?
            <>
            <Button style={{ margin: 12, borderRadius: 5,marginTop: 25 }} mode="contained" onPress={onStart}> {content.buttonText}</Button>
          </> : null 
        }
      </ScrollView>
    </>  
  );
};