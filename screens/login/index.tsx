import React, { useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import "firebase/firestore";
import firebase from "firebase";
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from "expo-google-sign-in";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { setLoginState } from "../../redux/actions";
import { createStackNavigator } from "@react-navigation/stack";
import { SignUpScreen } from "../signup";
import { UserInfo } from "../UserInfo";

const { Navigator, Screen } = createStackNavigator();
export const AuthStackScreen = () => {
  return (
    <Navigator>
      <Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Sign In" }}
      />
      <Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Sign Up" }}
      />
      <Screen
        name="UserInfo"
        component={UserInfo}
        options={{ title: "User Info" }}
      />
    </Navigator>
  );
};

export const SignInScreen = ({ navigation }: any) => {
  var appLogo = require("../../Images/Logo.png");
  const [loading, setLoading] = useState(false);
  const { signIn } = React.useContext(AuthContext);
  const dispatch = useDispatch();

  const onLoginSuccess = (curUser: any) => {
    const currentState = {
      userId: curUser.user.uid,
      email: curUser.user.email,
      name: curUser.user.displayName,
    };

    dispatch(setLoginState(currentState));

    signIn(curUser.user);
  };

  const renderLoading = () => {
    if (loading) {
      return (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  };
  async function signInWithFacebook() {
    try {
      await Facebook.initializeAsync("650718795524020");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "650718795524020",
        {
          permissions: ["public_profile"],
        }
      );
      if (type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        onLoginSuccess(facebookProfileData);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  async function signInWithGoogle() {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      const data = await GoogleSignIn.GoogleAuthentication.prototype.toJSON();
      if (type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );
        const googleProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        onLoginSuccess(googleProfileData);
      }
    } catch ({ message }) {
      alert("Invalid Credetntials");
    }
  }

  return (
    <SafeAreaView>
      <Button icon="facebook" onPress={signInWithFacebook}>
        Login with Facebook
      </Button>
      <Button icon="google" onPress={signInWithGoogle}>
        Login with Google
      </Button>
      <Button
        mode="text"
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        Don't have an Account?
      </Button>
    </SafeAreaView>
  );
};
