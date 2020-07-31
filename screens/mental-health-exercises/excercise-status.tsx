import React, { useEffect, useState } from 'react';
import { List, Card, ActivityIndicator, Appbar, Button, Headline } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { checkMentalExaminationExists } from '../../services/firebase';
import { CoronaProfile } from '../corona-profile';
import { PsychoticProfile } from '../psychotic-profile';
import {HelpCenterPPScreen} from '../psychotic-profile/helpPP'
import { SuicideIdeationProfile } from '../suicide-ideation';
import { HelpCenterSIScreen } from '../suicide-ideation/helpSI';
import { DomesticViolenceProfile } from '../domestic-violence';
import {HelpCenterDVScreen} from '../domestic-violence/helpDV';
import {UserContext} from '../../context';
import {getUserInfo} from '../../storage';
import {exerciseStatusToContentMap,MENTAL_HEALTH_STATUS_TITLE,MENTAL_HEALTH_JUDGE_SECTIONS } from './content';
import { getMentalHealthExcercise } from '../../services/firebase';
import { isExcerciseTaken } from '../../utils/exercise';
const { Navigator, Screen } = createStackNavigator();



export const ExcerciseStatusScreen = ({navigation }: any) => {
  const [mentalStateTitle, SetmentalStateTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [isExcersieOn, setIsExcersieOn] = useState(false);
  const [content,SetContent]  = useState(exerciseStatusToContentMap['disabled']);
  const {userName} = React.useContext(UserContext);

  const setProfileState= async (profileState:any) =>{
    for (var i = 0; i < profileState.length-1; i++) {
      if (profileState[i]) {
        MENTAL_HEALTH_JUDGE_SECTIONS[i].iconName = 'check';
      }
    }
    // profileState[3] indicates if healthStatus Ever done or not
    if(profileState[3]){
        SetmentalStateTitle(MENTAL_HEALTH_STATUS_TITLE.done.title);

        if(profileState[0] || profileState[1]  || profileState[2] ){
            setIsExcersieOn(true);
            const curlist = await getMentalHealthExcercise(userName);
            const excersiseStatus = isExcerciseTaken(curlist);
            SetContent(exerciseStatusToContentMap[excersiseStatus]);
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
      
        <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title="আপনার মানসিক অবস্থার মূল্যায়ন" />
          <Card.Content>
                <List.Item
                  title={mentalStateTitle}
                  onPress={() => { navigation.navigate('MentalHealthRating', { navigateTo: 'ExcerciseStatus'});}}
                />
          </Card.Content>
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
        <Headline style={{ margin: 12, borderRadius: 5 }}>{content.title}</Headline>
        { isExcersieOn?
            <>
            <Button mode="contained" onPress={onStart}> {content.buttonText}</Button>
          </> : null 
        }
      </ScrollView>
    </>  
  );
};