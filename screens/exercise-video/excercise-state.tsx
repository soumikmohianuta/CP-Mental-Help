import React, { useEffect, useState } from 'react';
import { List, Card, ActivityIndicator, Appbar, Button, Headline, Paragraph,Text } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { checkMentalExaminationExists } from '../../services/firebase';
import {UserContext} from '../../context';
import {exerciseStatusToContentMap,MENTAL_HEALTH_STATUS_TITLE,MENTAL_HEALTH_JUDGE_SECTIONS } from './content';
import {setVideoRating} from '../../services/firebase';
import { resources } from '../mental-health-exercises/content';
import { Rating } from 'react-native-ratings';

const { Navigator, Screen } = createStackNavigator();


export const ExcerciseStateScreen = ({route, navigation }: any) => {

  const { exercise } = route.params;
  const { videoId, name, content_id, order } = exercise;

  const [mentalStateTitle, SetmentalStateTitle] = useState(MENTAL_HEALTH_STATUS_TITLE['done']);
  const [loading, setLoading] = useState(true);
  const [ratingShow,SetRatingShow]  = useState(true);
  const {userName} = React.useContext(UserContext);
  const [rateVal, setRateVal] = useState(3);
  const setProfileState= async (mentalExamState:any) =>{

    MENTAL_HEALTH_JUDGE_SECTIONS[0].iconName =  mentalExamState.ghq ?'check':'cancel';
    MENTAL_HEALTH_JUDGE_SECTIONS[1].iconName =  mentalExamState.pss ?'check':'cancel';
    MENTAL_HEALTH_JUDGE_SECTIONS[2].iconName =  mentalExamState.anxiety ?'check':'cancel';
 
  }
  const ratingDone= (rating:any) =>{
    setRateVal(rating);
  }

  const ratingSubmit= () =>{
    setVideoRating(userName,content_id,rateVal); 
    SetRatingShow(false);
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

    navigation.navigate('ExerciseVideo', {
        exercise: resources[order + 1]
      })
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthExercise')}  />
        <Appbar.Content title="মানসিক স্বাস্থ্য পরিমাপের অবস্থা" />
      </Appbar.Header>
      <ScrollView>
    <Paragraph>  { ratingShow?  'ভিডিওটি সম্পর্কে আপনার মতামত দিন': 'আপনার মতামতের জন্য ধন্যবাদ' } </Paragraph>

     
      <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title={ ratingShow?  'ভিডিওটি সম্পর্কে আপনার মতামত দিন': 'আপনার মতামতের জন্য ধন্যবাদ' } />
          <Card.Content>
                {ratingShow ? <Rating onFinishRating={(rating:number) =>ratingDone(rating)} />  :null}
                {ratingShow ?  <Button style={{ margin: 12, borderRadius: 5,marginTop: 25 }} mode="contained" onPress={ratingSubmit}>রেটিং সাবমিট করুন</Button> :null}
            </Card.Content>
      </Card>

      <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title="আপনার মানসিক অবস্থার মূল্যায়ন" />
          <Card.Actions>
              <Button onPress={() => { navigation.navigate('MentalHealthRating', { navigateTo: 'Home'});}}>{mentalStateTitle.title}</Button>
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
            { order != resources.length-1 ?
            <Button style={{ margin: 12, borderRadius: 5,marginTop: 25 }} mode="contained" onPress={onStart}>পরবর্তী ভিডিও</Button> : null
            }
        
      </ScrollView>
    </>  
  );
};