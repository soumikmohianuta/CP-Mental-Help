import React, { useEffect, useState } from 'react';
import { List, Card, ActivityIndicator, Appbar, Button, Headline, Paragraph, TextInput } from 'react-native-paper';
import { ScrollView, View, TouchableHighlight } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../../../context';
import { exerciseStatusToContentMap, MENTAL_HEALTH_STATUS_TITLE, MENTAL_HEALTH_JUDGE_SECTIONS } from './content';
import { setVideoRating, isRaingRequire } from   '../../../services/firebase';
import { resources } from '../content';
import { Rating } from 'react-native-ratings';

const { Navigator, Screen } = createStackNavigator();

const ExamineImage = require('../../../Images/examine.png');
export const ExcerciseStateScreen = ({ route, navigation }: any) => {

  const { exercise } = route.params;
  const { videoId, name, content_id, order } = exercise;

  const [mentalStateTitle, SetmentalStateTitle] = useState(MENTAL_HEALTH_STATUS_TITLE['done']);
  const [loading, setLoading] = useState(true);
  const [ratingShow, SetRatingShow] = useState(true);
  const { userName } = React.useContext(UserContext);
  const [rateVal, setRateVal] = useState(3);
  const [commentText, setCommentText] = useState("");
  const [ratingRequire, setRatingRequire] = useState(true);

  const ratingDone = (rating: any) => {
    setRateVal(rating);
  }

  const ratingSubmit = async () => {
    try {
      await setVideoRating(userName, content_id, rateVal, commentText);

    }
    catch{
      alert("সাবমিট করা যাচ্ছে না");
    }
    SetRatingShow(false);
  }

  useEffect(() => {
    const getPersonalData = async () => {
      try {

        var isRatingRequired = await isRaingRequire(userName, content_id);
        setRatingRequire(isRatingRequired);


      } catch (e) {
        alert('ব্যক্তিগত তথ্য দেখানো যাচ্ছে না');
      } finally {
        setLoading(false);
      }
    }
    getPersonalData();
  }, []);

  const renderError = (userComment: string) => {

    setCommentText(userComment);
  }

  const onStart = async () => {

    navigation.navigate('ExerciseVideo', {
      exercise: resources[order + 1]
    })
  }

  const onExamStart = async () => {

    navigation.navigate('MentalHealthRating', { navigateTo: 'Home' });
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthExercise')} />
        <Appbar.Content title="মানসিক স্বাস্থ্য পরিমাপের অবস্থা" />
      </Appbar.Header>
      <ScrollView>

        {ratingRequire && <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title={ratingShow ? 'ভিডিওটি সম্পর্কে আপনার মতামত দিন' : 'আপনার মতামতের জন্য ধন্যবাদ'} />
          <Card.Content>
            {ratingShow ? <Rating onFinishRating={(rating: number) => ratingDone(rating)} /> : null}
            {ratingShow ? <TextInput style={{ margin: 12, borderRadius: 5, marginTop: 10, marginBottom: 10 }} onChangeText={text => renderError(text)} defaultValue="" placeholder="মতামত" /> : null}
            {ratingShow ? <Button style={{ margin: 12, borderRadius: 5, marginTop: 15 }} mode="contained" onPress={ratingSubmit}>সাবমিট করুন</Button> : null}
          </Card.Content>
        </Card>
        }

        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 5
          }}
        >

          <TouchableHighlight onPress={onExamStart} underlayColor="#ba262b"
            style={{
              flex: 1,
              marginLeft: 10,
              marginRight: 5
            }}
          >
            <Card>
              <Card.Title title="মানসিক স্বাস্থ্য যাচাই করুন" />
              <Card.Cover source={ExamineImage} />
            </Card>
          </TouchableHighlight >
        </View>


        {order != resources.length - 1 ?
          <Button style={{ margin: 12, borderRadius: 5, marginTop: 25 }} mode="contained" onPress={onStart}>পরবর্তী ভিডিও</Button> : null
        }

      </ScrollView>
    </>
  );
};