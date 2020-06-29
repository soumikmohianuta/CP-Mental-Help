import firebase from "firebase";

export const fetchPersonalData = async (userId: string) => {
  const snapshot = await firebase
    .database()
    .ref("/DemoGraphy/" + userId)
    .once("value");
  const data = snapshot.val();
  return data && {
    age: data.Age,
    sex: data.Sex,
    maritalStatus: data.maritalStatus,
    address: data.address,
    email: data.Email, 
  }
}

export const setUserData = async (ref: string, data: any) => {
  firebase
  .database()
  .ref(ref)
  .set(data);
}