import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import "firebase/firestore";
import firebase from "firebase";
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from "expo-google-sign-in";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { setLoginState } from "../../redux/actions";

export const SignUpScreen = ({ navigation }: any) => {
  var appLogo = require("../../Images/Logo.png");
  const [loading, setLoading] = useState(false);
  const { signUp } = React.useContext(AuthContext);
  const dispatch = useDispatch();

  const onLoginSuccess = (curUser: any) => {
    const currentState = {
      userId: curUser.user.uid,
      email: curUser.user.email,
      name: curUser.user.displayName,
    };

    dispatch(setLoginState(currentState));

    signUp(curUser.user);
    navigation.navigate("UserInfo");
  };

  const renderLoading = () => {
    if (loading) {
      return <ActivityIndicator animating />;
    }
  };
  async function signUpWithFacebook() {
    try {
      await Facebook.initializeAsync("650718795524020");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
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
  async function signUpWithGoogle() {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          user.auth.idToken,
          user.auth.accessToken
        );
        const googleProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        onLoginSuccess(googleProfileData);
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  }

  return (
    <SafeAreaView>
      <Button icon="facebook" onPress={signUpWithFacebook}>
        Sign Up with Facebook
      </Button>
      <Button icon="google" onPress={signUpWithGoogle}>
        Sign Up with Google
      </Button>
      <Button
        mode="text"
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        Already have an account?
      </Button>
    </SafeAreaView>
  );
};
