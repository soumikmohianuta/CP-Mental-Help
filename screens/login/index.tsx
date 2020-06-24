import React, { useState } from "react";
import styled from "styled-components/native";
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native-paper";
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

const Container = styled(View)`
  flex: 3;
  flex-direction: column;
  align-items: center;
`;

const ImageViewContainer = styled(View)`
  flex: 7;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled(Image)`
  flex: 1;
  height: undefined;
  width: 80%;
  flex-direction: column;
  align-items: center;
`;

const FBButtonContainer = styled(View)`
  background-color: #3a559f;
  height: 44;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 22;
`;

const GButtonContainer = styled(View)`
  background-color: #0f9d58;
  height: 44;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 22;
  border-width: 1;
  border-color: #707070;
`;

const TouchableOpacityContainer = styled(TouchableOpacity)`
  width: 86%;
  margin-top: 5;
`;

const ButtonTextStyle = styled(Text)`
  font-size: 16;
  letter-spacing: 0.5;
`;

const SwitchAccountStyle = styled(Text)`
  font-weight: 200;
  color: #a82204;
  font-size: 17;
  text-align: center;
`;

export const SignInScreen = ({ navigation }: any) => {
  var appLogo = require("../../Images/Logo.png");
  const [loading, setLoading] = useState(false);
  const { signIn } = React.useContext(AuthContext);
  const [userId, setUserID] = useState("");
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
    <SafeAreaView style={{ flex: 1 }}>
      <ImageViewContainer>
        <ImageContainer source={appLogo} />
      </ImageViewContainer>

      <Container>
        <TouchableOpacityContainer onPress={() => signInWithFacebook()}>
          <FBButtonContainer>
            <ButtonTextStyle>Login with Facebook</ButtonTextStyle>
          </FBButtonContainer>
        </TouchableOpacityContainer>
        <TouchableOpacityContainer onPress={() => signInWithGoogle()}>
          <GButtonContainer>
            <ButtonTextStyle>Login with Google</ButtonTextStyle>
          </GButtonContainer>
        </TouchableOpacityContainer>

        <View style={{ marginTop: 10 }}>
          <SwitchAccountStyle
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Don't have an Account?
          </SwitchAccountStyle>
        </View>
      </Container>
    </SafeAreaView>
  );
};
