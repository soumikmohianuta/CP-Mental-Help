import firebase from "firebase";

export const fetchPersonalData = async (userId: string) => {
  const snapshot = await firebase
    .database()
    .ref(userId+"/DemoGraphy/")
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

export const getProfileState= async (userId:string) =>{
  var profileState = [ false,
      false,
      false,
      false
  ]
  const snapshot =await firebase.database().ref(userId + '/MentalProfile').once('value');
  if (snapshot.val() !== null){

        if(snapshot.val().CoronaProfile){
          profileState[0] = true;
          }
       if(snapshot.val().PsychoticProfile){
          profileState[1] = true;
         }
        if(snapshot.val().SuicideIdeationProfile){
          profileState[2] = true;
        }
        if(snapshot.val().DomesticViolenceProfile){
          profileState[3] = true;
       }
    }

  return profileState;
}


export const checkUserInfoExists = async (userId: string) => {
  var checkValue = false;
  const snapshot = await firebase
    .database()
    .ref(userId+"/DemoGraphy/")
    .once("value");
    if (snapshot.val() !== null){
      checkValue = true;
    }
  return checkValue;
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