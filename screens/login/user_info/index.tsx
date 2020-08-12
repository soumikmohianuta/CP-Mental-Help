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
import { RadioButtonGroup } from '../../../components/radio-button-group';
import {
  questions,
  MaritalStatus,
  CurrentLocation,
} from "./contents";
import firebase from "firebase";
import { storeUserInfo } from '../../../storage';
import { AuthContext, UserContext } from '../../../context';
import { deleteRatingDate } from '../../../storage';
import { isNetworkAvailable } from '../../../utils/network';


export const UserInfo = ({ route, navigation }: any) => {
  const NUMBER_OF_QUESTIONS = questions.length;
  const [count, setCount] = useState<number>(0);
  const { signIn } = React.useContext(AuthContext);
  const [ErrorMsg, SetErrorMsg] = useState("Not a valid Age");
  const [age, SetAge] = useState(0);
  const [sex, SetSex] = useState("");
  const [maritalStatus, SetMaritalStatus] = useState("");
  const [address, SetAddress] = useState("");
  const { curUser } = route.params;

  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [currentAnswers, setCurrentAnswers] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const userData = {
      Email: curUser.user.email,
      Age: age,
      Sex: sex,
      maritalStatus: maritalStatus,
      address: address,
    };

    try {
      const isConnected = await isNetworkAvailable();
      if (isConnected) {
        firebase
          .database()
          .ref(curUser.user.uid + "/DemoGraphy")
          .set(userData);
        await storeUserInfo(userData);
        signIn(curUser);
        await deleteRatingDate();
        setLoading(false);
      }
      else {
        throw new Error("Net");
      }
    }
    catch (e) {
      if (e.message == 'Net') {
        alert('কোন ইন্টারনেট সংযোগ নেই');
      }
      else {
        console.log(e);
        alert("সাবমিট করা যাচ্ছে না");
      }
    }

  };

  const renderError = (curAge: any) => {
    if (curAge < 10 || curAge > 100) {
      SetErrorMsg("সঠিক বয়স প্রদান করুন");
      setShowSubmit(false);
    } else {
      SetErrorMsg("");
      SetAge(curAge);
      setShowSubmit(true);
    }
  };

  const handlePrevious = () => {
    if (count == 1) {
      setCurrentAnswers(sex);
    }
    else if (count == 2) {
      setCurrentAnswers(maritalStatus);
    }
    else {
      setCurrentAnswers(address);
    }
    setCount(count - 1);
    setShowSubmit(false);
  }


  if (loading) {
    return <ActivityIndicator />;
  }

  const onAnswerSelect = (value: string) => {
    if (count == 0) {
      SetSex(value);
    }
    else if (count == 1) {
      SetMaritalStatus(value);
    }
    else {
      SetAddress(value);
    }
    setTimeout(() => {
      setCount(count + 1);
    }, 250);

  }


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('SignIn')} />
        <Appbar.Content title="ব্যক্তিগত তথ্যাবলী" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }} keyboardShouldPersistTaps={'handled'}>
        <Subheading style={{ marginTop: 12, marginBottom: 12 }}> QUESTIONS {count + 1} of {NUMBER_OF_QUESTIONS}</Subheading>
        <ProgressBar
          progress={(count + 1) / NUMBER_OF_QUESTIONS}
          color={Colors.red800}
          style={{ marginBottom: 24 }}
        />
        {
          questions.map((item: any, index: number) => {
            return index != count ?
              null
              :
              <>
                <Headline
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 80,
                  }}
                >
                  {item.question}
                </Headline>
                {count === NUMBER_OF_QUESTIONS - 1 ?
                  <TextInput
                    onChangeText={text => renderError(text)}
                    defaultValue=""
                    placeholder="বয়স"
                    keyboardType="number-pad"
                  />
                  :
                  <RadioButtonGroup
                    options={item.answers}
                    onSelect={onAnswerSelect}
                    defaultValue={currentAnswers}
                  />}

              </>
          })
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
            disabled={count === 0}
            mode="outlined"
          >
            Previous
          </Button>
          {
            showSubmit && count === NUMBER_OF_QUESTIONS - 1 ?
              <Button onPress={handleSubmit} mode="contained"> Submit </Button>
              : null
          }
        </View>
        {
          count === NUMBER_OF_QUESTIONS - 1 ?

            <Text
              style={{
                color: Colors.red800,
                marginTop: 12
              }}
            >
              {ErrorMsg}
            </Text> : null
        }
      </ScrollView>


    </>
  );
};
