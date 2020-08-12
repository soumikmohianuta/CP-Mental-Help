import firebase from "firebase";
import { Item } from "react-native-paper/lib/typescript/src/components/List/List";
import {getExerciseList} from '../../utils/exercise';

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

export const setProfileState = async (userId: string, profileName:string, answers:any) => {
  var curData = {}

  for (var i = 0; i < answers.length; i++) {
      var curName = answers[i].name;
      var curVal = answers[i].answer; 
      curData[curName]=curVal;

    }
   await firebase
      .database()
      .ref(userId + "/mental_profile/"+profileName+"/")
      .set(curData);

}

export const getMentalProfileState = async (userId: string) => {
  var profileState = [{name:'corona_profile',state:false, order:0},{name:'psychotic_profile',state:false, order:1},{name:'suicide_profile',state:false, order:2},{name:'domestic_profile',state:false, order:3}]
  const snapshot = await firebase
    .database()
    .ref(userId + "/mental_profile/")
    .once("value");
  if (snapshot.val() !== null) {
    if (snapshot.val().corona_profile) {
      profileState[0].state = true;
    }
    if (snapshot.val().psychotic_profile) {
      profileState[1].state = true;
    }
    if (snapshot.val().suicide_profile) {
      profileState[2].state = true;
    }
    if (snapshot.val().domestic_profile) {
      profileState[3].state = true;
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


export const isRaingRequire = async (userId: string, videoID:string) => {
  const snapshot = await firebase
    .database()
    .ref(`${userId}/rating/${videoID}`)
    .once("value");
  if (snapshot.val() !== null) {
      return false;

  }
  else{
    return true;
  }
};


export const setVideoRating = async (
  userId: string,
  videoID: string,
  score: number,
  commnentText:string
) => {
  firebase.database().ref(`${userId}/rating/${videoID}/rating`).set(score);
  firebase.database().ref(`${userId}/rating/${videoID}/comment`).set(commnentText);
}

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


export const setMentalInitialExcercise = async (userId: string,  list: any) => {
  const snapshot = await firebase
    .database()
    .ref(userId)
    .once("value");
    if (snapshot.val() !== null) {
      if (!snapshot.val().mental_health_excercises) {
        firebase.database().ref(`${userId}/mental_health_excercises/`).set(list);
    }
  }


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
    if(snapshot.val() == null){
      var excerciseList = getExerciseList();
      getMentalHealthScore(userId, excerciseList)
      return excerciseList;
    }
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
  var profileState = {ghq:false, pss:false, anxiety:false,mentalstatemeasure:false};
  const snapshot = await firebase
    .database()
    .ref(userId)
    .once("value");
  if (snapshot.val() !== null) {
    if (snapshot.val().ghq) {
      profileState.ghq = true;
    }
    if (snapshot.val().pss) {
      profileState.pss = true;
    }
    if (snapshot.val().anxiety) {
      profileState.anxiety = true;
    }
    if (snapshot.val().mentalstate) {
      profileState.mentalstatemeasure = true;
    }

  }

  return profileState;
};