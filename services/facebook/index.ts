import * as Facebook from "expo-facebook";
import firebase from "firebase";

export const signInFacebook = async () => {
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
    return facebookProfileData;
  } else {
    throw new Error(type);
  }
}

export const signUpFacebook = async () => {
  await Facebook.initializeAsync("650718795524020");
  const {
    type,
    token,
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
    return facebookProfileData;
  } else {
    throw new Error(type);
  }
}