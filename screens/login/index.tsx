import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Avatar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { UserInfo } from "../UserInfo";
import { signInFacebook, signUpFacebook } from "../../services/facebook";
import { signInGoogle, signUpGoogle } from "../../services/google";

const { Navigator, Screen } = createStackNavigator();
export const AuthStackScreen = () => {
  return (
    <Navigator>
      <Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "" }}
      />
      <Screen
        name="UserInfo"
        component={UserInfo}
        options={{ title: "User Info" }}
      />
    </Navigator>
  );
};

const socialMediaButtonStyle = {
  margin: 12,
};

export const SignInScreen = ({ navigation }: any) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const onLoginSuccess = (curUser: any) => {
    const currentState = {
      userId: curUser.user.uid,
      email: curUser.user.email,
      name: curUser.user.displayName,
    };
    // TODO: store to expo storage and redirect to home.
  };

  const handleFacebookAuth = async () => {
    try {
      const data = isSignIn ? await signInFacebook() : await signUpFacebook();
      onLoginSuccess(data);
    } catch(e) {
      alert('Facebook auth error');
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const data = isSignIn ? await signInGoogle() : await signUpGoogle();
      onLoginSuccess(data);
    } catch(e) {
      alert('Google auth error');
    }
  }

  const switchToAuth = () => {
    setIsSignIn(!isSignIn);
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
        { isSignIn ? 'Login with Facebook' : 'Sign Up with Facebook' }
      </Button>
      <Button
        icon="google"
        mode="contained"
        uppercase={false}
        color="#DB4437"
        style={socialMediaButtonStyle}
        onPress={handleGoogleAuth}
      >
         { isSignIn ? 'Login with Google' : 'Sign Up with Google' }
      </Button>
      <Button
        mode="text"
        uppercase={false}
        onPress={switchToAuth}
      >
        { isSignIn ? `Don't have an Account?` : 'Already have an account?'}
      </Button>
    </SafeAreaView>
  );
};
