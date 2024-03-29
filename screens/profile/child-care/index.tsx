import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  ScrollView,
  Image,
  SafeAreaView 
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Headline,
  Appbar,
  ProgressBar,
  Subheading,
  Colors,
  ActivityIndicator
} from "react-native-paper";
import { RadioButtonGroup } from '../../../components/radio-button-group';;
import {
  question, YesNoResponse
} from "./contents";
import firebase from "firebase";
import { storeUserInfo } from '../../../storage';
import { AuthContext, UserContext } from '../../../context';
import { MENTAL_PROFILE_MAPPER } from '../contents';
import { isNetworkAvailable } from '../../../utils/network';
import { useFocusEffect } from '@react-navigation/native';

export const ChildCareProfile = ({ navigation }: any) => {

  const [violence, SetViolence] = useState("");


  const { userName } = React.useContext(UserContext);

  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(false);
    }, [])
  );

  const handleSubmit = async () => {

    setLoading(true);
    const userData = {
      dmv: violence
    };
    var submitSuccess = true;
    try {
      const isConnected = await isNetworkAvailable();


      if (isConnected) {
        firebase
          .database()
          .ref(userName + "/mental_profile/childcare_profile")
          .set(userData);
      }
      else {
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
      submitSuccess = false;
      setLoading(false);
    }
    finally {

        navigation.navigate("Profile", { profile: MENTAL_PROFILE_MAPPER.ChildCareProfile, submit: submitSuccess });

     
    }

  };





  if (loading) {
    return <ActivityIndicator />;
  }

  const onAnswerSelect = (value: string) => {
    SetViolence(value);
    setShowSubmit(true);

  }


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Profile')} />
        <Appbar.Content title="সন্তান পালন সম্পর্কিত তথ্য" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }}>

        <>
          <Headline
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 120,
            }}
          >
            {question}
          </Headline>
          <RadioButtonGroup
            options={YesNoResponse}
            onSelect={onAnswerSelect}
          />

        </>



        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 12
          }}
        >

          {
            showSubmit ?
              <Button onPress={handleSubmit} mode="contained"> Submit </Button>
              : null
          }
        </View>

      </ScrollView>


    </>
  );
};
