import firebase from "firebase";


export const fetchPersonalData = async (userId: string) => {
  const snapshot = await firebase
    .database()
    .ref(userId + "/DemoGraphy/")
    .once("value");
  const data = snapshot.val();
  return (
    data && {
      userAge: data.Age,
      userSex: data.Sex,
      userMaritalStatus: data.maritalStatus,
      userAddress: data.address
    }
  );
};

export const getProfileState = async (userId: string) => {
  var profileState = [false, false, false, false];
  const snapshot = await firebase
    .database()
    .ref(userId + "/MentalProfile")
    .once("value");
  if (snapshot.val() !== null) {
    if (snapshot.val().CoronaProfile) {
      profileState[0] = true;
    }
    if (snapshot.val().PsychoticProfile) {
      profileState[1] = true;
    }
    if (snapshot.val().SuicideIdeationProfile) {
      profileState[2] = true;
    }
    if (snapshot.val().DomesticViolenceProfile) {
      profileState[3] = true;
    }
  }

  return profileState;
};

export const checkUserInfoExists = async (userId: string) => {
  var checkValue = false;
  const snapshot = await firebase
    .database()
    .ref(userId + "/DemoGraphy/")
    .once("value");
  if (snapshot.val() !== null) {
    checkValue = true;
  }
  return checkValue;
};

export const setUserData = async (userID: string, data: any) => {
  firebase.database().ref(`${userID}/${Date.now()}`).set(data);
};

export const setMentalState = async (userID: string, data: any) => {
  firebase.database().ref(`${userID}/mentalstate/${Date.now()}`).set(data);
};

export const setMentalHealthScore = async (
  userId: string,
  scale: string,
  score: number
) => firebase.database().ref(`${userId}/${scale}/${Date.now()}`).set(score);

export const getMentalHealthScore = async (userId: string, scale: string) => {
  const snapshot = await firebase
    .database()
    .ref(`${userId}/${scale}`)
    .once("value");
  return snapshot.val();
};

export const setMentalHealthExcercise = async (
  userId: string,
  list: any,
) => firebase.database().ref(`${userId}/mental_health_excercises/`).set(list);

export const markExcerciseAsDone = async (
  userId: string,
  content_id: any,
) => firebase.database().ref(`${userId}/mental_health_excercises/${content_id}`).set(1);

export const getMentalHealthExcercise = async (userId: string) => {
  const snapshot = await firebase
    .database()
    .ref(`${userId}/mental_health_excercises`)
    .once("value");
  return snapshot.val();
};


export const checkMentalEvaluationExists = async (userId: string) => {
  var profileState = false;
  const snapshot = await firebase
    .database()
    .ref(userId)
    .once("value");
  if (snapshot.val() !== null) {
    if (snapshot.val().MentalState) {
      profileState = true;
    }
  }

  return profileState;
};

export const checkMentalExaminationExists = async (userId: string) => {
  var profileState = [false, false, false,false];
  const snapshot = await firebase
    .database()
    .ref(userId)
    .once("value");
  if (snapshot.val() !== null) {
    if (snapshot.val().ghq) {
      profileState[0] = true;
    }
    if (snapshot.val().pss) {
      profileState[1] = true;
    }
    if (snapshot.val().anxiety) {
      profileState[2] = true;
    }
    if (snapshot.val().mentalstate) {
      profileState[3] = true;
    }

  }

  return profileState;
};