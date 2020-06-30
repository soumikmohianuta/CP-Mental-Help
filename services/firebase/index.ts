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

export const setMentalHealthScore = async (userId: string, scale: string, score: number) =>
  firebase
  .database()
  .ref(`${userId}/${scale}/${Date.now()}`)
  .set(score);

  export const getMentalHealthScore = async (userId: string, scale: string) => {
    const snapshot = await firebase.database().ref(`${userId}/${scale}`).once('value');
    return snapshot.val();
  }