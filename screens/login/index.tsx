import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View,KeyboardAvoidingView,TextInput,SafeAreaView,TouchableOpacity,ActivityIndicator,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useForm,Controller } from "react-hook-form";
import { Text, Button, Input } from 'react-native-elements';
import "firebase/firestore";
import firebase from "firebase";
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import {AuthContext} from '../../context/AuthContext';
import {useSelector,useDispatch } from 'react-redux';
import {setLoginState} from '../../redux/actions';
const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;



const ButtonContainer = styled(View)`
  background-color: #3A559F;
  height: 44;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 22;
`;

const GButtonContainer = styled(View)`
      background-color: #ffffff;
      height: 44;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 22;
      border-width: 1;
      border-color: #707070;
`;




export const SignInScreen = ({ navigation }: any) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, seErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const {signIn} = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const onLoginSuccess= (curUser:any) => {

    const currentState = {
      userId: curUser.user.uid,
      email: curUser.user.email,
      name: curUser.user.displayName,
    };

    dispatch(setLoginState(currentState));
    navigation.navigate("UserInfo");
    signIn(curUser.user);
  }
  const onLoginFailure= (errorMessage:string) => {
    seErrorMessage(errorMessage);
    setLoading(false);
  }

  const renderLoading= () => {
    if (loading) {
      return (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }

  async function signInWithFacebook(){
    try {
      await Facebook.initializeAsync('650718795524020');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('650718795524020', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInWithCredential(credential);
        onLoginSuccess(facebookProfileData);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      //alert(`Facebook Login Error: ${message}`);

    }
  }
  async function signInWithGoogle(){
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      const data = await GoogleSignIn.GoogleAuthentication.prototype.toJSON();
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        const googleProfileData = await firebase.auth().signInWithCredential(credential);
        onLoginSuccess(googleProfileData);
      }
    } catch ({ message }) {
//      alert('login: Error:' + message);
      alert('Invalid Credetntials');
    }
  }

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <Container behavior="padding">
        <Text style={{ fontSize: 32, fontWeight: "700", color: "gray" }}>
          মন ও বিজ্ঞান
        </Text>
        <TouchableOpacity 
          style={{ width: "86%", marginTop: 10 }}
          onPress={() => signInWithFacebook()}>
          <ButtonContainer>
            <Text
              style={{
                letterSpacing: 0.5,
                fontSize: 16,
                color: "#FFFFFF"
              }}
            >
              Continue with Facebook
            </Text>
          </ButtonContainer>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ width: "86%", marginTop: 10 }}
          onPress={() => signInWithGoogle()}>
          <GButtonContainer >
            <Text
              style={{
                letterSpacing: 0.5,
                fontSize: 16,
                color: "#707070"
              }}
            >
              Continue with Google
            </Text>
          </GButtonContainer>
        </TouchableOpacity>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Don't have an Account?
          </Text>
        </View>
      </Container>
    </SafeAreaView>
  );
  
}