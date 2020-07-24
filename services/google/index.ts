import * as GoogleSignIn from "expo-google-sign-in";
import firebase from "firebase";

export const signInGoogle = async () => {
  await GoogleSignIn.askForPlayServicesAsync();
  const { type } = await GoogleSignIn.signInAsync();
  const data = GoogleSignIn.GoogleAuthentication.prototype.toJSON();

  if (type === "success") {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const keys = Object.keys(data);
    //alert(data.clientId);  
    const credential = firebase.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken
    );
    const googleProfileData = await firebase
      .auth()
      .signInWithCredential(credential);
    return googleProfileData;
  } else {
    throw new Error(type);
  }
}

export const signUpGoogle = async () => {
  await GoogleSignIn.askForPlayServicesAsync();
  const { type, user } = await GoogleSignIn.signInAsync();
  if (type === "success") {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const credential = firebase.auth.GoogleAuthProvider.credential(
      user && user.auth && user.auth.idToken,
      user && user.auth &&user.auth.accessToken
    );
    const googleProfileData = await firebase
      .auth()
      .signInWithCredential(credential);
    return googleProfileData;
  } else {
    throw new Error(type);
  }
}