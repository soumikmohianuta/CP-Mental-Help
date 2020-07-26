import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Avatar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { UserInfo } from "../UserInfo";
import { ConsentScreen } from "../Consent";
import { signInFacebook, signUpFacebook } from "../../services/facebook";
import { signInGoogle, signUpGoogle } from "../../services/google";
import { NavigationContainer } from '@react-navigation/native';
import {getItem} from '../../storage';
import {AuthContext, UserContext} from '../../context';
import {checkUserInfoExists} from '../../services/firebase';

const { Navigator, Screen } = createStackNavigator();
export const AuthStackScreen = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="SignIn"
          component={SignInScreen}
         options={{ title: "" }}
       />
       <Screen
         name="Consent"
         component={ConsentScreen}
         options={{ title: "Consent" }}
       />
       <Screen
         name="UserInfo"
         component={UserInfo}
         options={{ title: "User Info" }}
       />
      </Navigator>
    </NavigationContainer>
  );
};

const socialMediaButtonStyle = {
  margin: 12,
};

export const SignInScreen = ({ navigation }: any) => {
  const {signIn} = React.useContext(AuthContext);
  const onLoginSuccess = (curUser: any) => {
    const checkUser = async () => {
      var userInfoExists = await checkUserInfoExists(curUser.user.uid);
      if(userInfoExists){
          signIn(curUser);
      }
      else{
          navigation.navigate("Consent", {curUser});
      }
    };
    checkUser();
  };

  const handleFacebookAuth = async () => {
    try {
      const data =  await signUpFacebook();
      onLoginSuccess(data);
    } catch(e) {
      alert(e);
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const data =  await signUpGoogle();
      onLoginSuccess(data);
    } catch(e) {
      alert(e);
      //alert('Google auth error');
    }
  }



  return (
    <SafeAreaView style={{ marginTop: 60 }}>
      <View
        style={{ alignItems:'center' }}
      >
          <Avatar.Image
            size={280}
            style={{ backgroundColor: 'transparent' }}
            source={require('../../Images/Logo.png')}
          />
      </View>
      <Button
        icon="facebook"
        mode="contained"
        uppercase={false}
        color="#4267B2"
        style={socialMediaButtonStyle}
        onPress={handleFacebookAuth}
      >
        { 'Login with Facebook' }
      </Button>
      <Button
        icon="google"
        mode="contained"
        uppercase={false}
        color="#DB4437"
        style={socialMediaButtonStyle}
        onPress={handleGoogleAuth}
      >
         { 'Login with Google' }
      </Button>

    </SafeAreaView>
  );
};