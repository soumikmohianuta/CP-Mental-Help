import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Avatar, ActivityIndicator } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { UserInfo } from "./user_info";
import { ConsentScreen } from "./consent";
import { signInFacebook, signUpFacebook } from "../../services/facebook";
import { signInGoogle, signUpGoogle } from "../../services/google";
import { NavigationContainer } from '@react-navigation/native';
import { getItem } from '../../storage';
import { AuthContext, UserContext } from '../../context';
import { checkUserInfoExists } from '../../services/firebase';
import { isNetworkAvailable } from '../../utils/network';
const { Navigator, Screen } = createStackNavigator();


export const AuthStackScreen = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="SignIn" component={SignInScreen} />
        <Screen name="Consent" component={ConsentScreen} />
        <Screen name="UserInfo" component={UserInfo} />
      </Navigator>
    </NavigationContainer>
  );
}


const socialMediaButtonStyle = {
  margin: 12,
};

export const SignInScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const { signIn } = React.useContext(AuthContext);
  const onLoginSuccess = (curUser: any) => {
    const checkUser = async () => {
      var userInfoExists = await checkUserInfoExists(curUser.user.uid);
      if (userInfoExists) {
        signIn(curUser);
        setLoading(false);
      }
      else {
        navigation.navigate("Consent", { curUser });
        setLoading(false);
      }

    };
    checkUser();
  };

  const handleFacebookAuth = async () => {
    setLoading(true);
    try {
      const isConnected = await isNetworkAvailable();
      if (isConnected) {
        const data = isSignIn ? await signInFacebook() : await signUpFacebook();
        onLoginSuccess(data);
      }
      else {
        throw new Error("Net");
      }
    } catch (e) {
      setLoading(false);
      if (e.toString().includes("An account already exists")) {
        alert("এই ই-মেইল দিয়ে আপনার আরেকটি প্রোফাইল রয়েছে");
      }
      else if (e.message == 'Net') {
        alert('কোন ইন্টারনেট সংযোগ নেই');
      }
      else {
        console.log(e);
        alert("লগ-ইন সফল হয়নি");
      }
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const isConnected = await isNetworkAvailable();
      if (isConnected) {
        const data = isSignIn ? await signInGoogle() : await signUpGoogle();
        onLoginSuccess(data);
      }
      else {
        throw new Error("Net");
      }
    } catch (e) {
      setLoading(false);
      if (e.toString().includes("An account already exists with the same email address")) {
        alert("এই ই-মেইল দিয়ে আপনার আরেকটি প্রোফাইল রয়েছে");
      }
      else if (e.message == 'Net') {
        alert('কোন ইন্টারনেট সংযোগ নেই');
      }
      else {
        alert("লগ-ইন সফল হয়নি");
      }
    }
  }
  const switchToAuth = () => {
    setIsSignIn(!isSignIn);
  }

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView style={{ marginTop: 60 }}>
      <View
        style={{ alignItems: 'center' }}
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
        {isSignIn ? 'Continue with Facebook' : 'Sign Up with Facebook'}
      </Button>
      <Button
        icon="google"
        mode="contained"
        uppercase={false}
        color="#DB4437"
        style={socialMediaButtonStyle}
        onPress={handleGoogleAuth}
      >
        {isSignIn ? 'Continue with Google' : 'Sign Up with Google'}
      </Button>
      <Button
        mode="text"
        uppercase={false}
        onPress={switchToAuth}
      >
        {isSignIn ? `Don't have an Account?` : 'Already have an account?'}
      </Button>
    </SafeAreaView>
  );
};