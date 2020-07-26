import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
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
import { RadioButtonGroup } from "../../components/radio-button-group";
import {
  question,YesNoResponse
} from "./contents";
import firebase from "firebase";
import {storeUserInfo} from '../../storage';
import {AuthContext, UserContext} from '../../context';

export const DomesticViolenceProfile = ({ navigation }: any) => {
  const [count, setCount] = useState<number>(0);

  const [dViolence, SetDViolence] = useState("");


  const {userName} = React.useContext(UserContext);

  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async() => {

    setLoading(true);
    const userData = {
      domesticViolence: dViolence
    };
    try{
      firebase
        .database()
        .ref(userName+"/MentalProfile/DomesticViolenceProfile")
        .set(userData);
      
        if( dViolence == "Yes"){

          navigation.navigate("DomesticViolenceHelp");
        }
        else{
          var MentalProfileState = 3;
          navigation.navigate("Profile",{MentalProfileState});
        }
      }

      catch{
        alert('সাবমিট করা যাচ্ছে না');
    } 
      setLoading(false);
  };





  if (loading) {
    return <ActivityIndicator />;
  }

  const onAnswerSelect = (value: string) => {
      SetDViolence(value);
        setShowSubmit(true);

    }
  

  return (
    <> 
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.navigate('Profile')}  />
      <Appbar.Content title="ঘরোয়া সহিংসতা সম্পর্কীয়" />
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
