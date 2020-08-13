import { AsyncStorage } from 'react-native';
import React from 'react';



export const saveItem = async (key:string, value:string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error retrieving data
    }
  };

  export const getItem = async (key:string) => {
    let userId = '';
    try {
      userId = await AsyncStorage.getItem(key) || 'none';
    } catch (error) {
      // Error retrieving data
    }
    return userId;
  }

  export const deleteItem = async (key:string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // Error retrieving data
    }
  }


  export const checkItemExists = async (key:string) => {
    try {
       const value = await AsyncStorage.getItem(key);
       
       if (value != null){
            return true;
       }
    } catch (error) {
      // Error retrieving data
    }
    return false;
  }

  export const deleteRatingDate = async () => {
    await deleteItem('ratingLastDate');
  };


  export const setRatingDate = async () => {
    await saveItem('ratingLastDate',Date.now().toString());
  };


  const dateFormat = (date: any) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  const dateFormat1 = (date: any) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()-1}`;
  }

  export const getMentalHealthRatingRequire = async () => {
    try {
      const value = await AsyncStorage.getItem('ratingLastDate');
      if (value != null){
           const savedDate=  dateFormat(new Date(Number(value)));
           const curdate = dateFormat(new Date(Date.now()));
           if(savedDate== curdate){
             return false;
           }
           else{
             return true;
           }
      }
      else{
        return true;
      }
   } catch (error) {
     // Error retrieving data
      return true;
   }
  };
  

  export const setHomeProgressRequire = async (isRequired:boolean) => {
    if (isRequired){
      await saveItem('progressUpdated',"Yes");
    }
    else{
      await saveItem('progressUpdated',"No");
    }
  }

  export const getHomeProgressRequire = async () => {
    var valueInStore = await getItem('progressUpdated');
    if (valueInStore=="Yes"){
      return true;
    }
    else{
      return false;
    }
  }

  export const storeUserContext = async (curUser:any) => {

    await saveItem('userName',curUser.user.uid);
    await saveItem('displayname',curUser.user.displayName);
    await saveItem('email',curUser.user.email);

  }
  
  export const getContextFromStorage = async() => {
  
    var userNameInstorages = await getItem('userName');
    var displayNameInStore = await getItem('displayName');
    var emailNameInstore = await getItem('email');
    const currentContext = {
    
      userName: userNameInstorages,
      displayName: displayNameInStore,
      email: emailNameInstore
    }
    return currentContext;
  }
  
  export const storeUserInfo = async (userData:any) => {

    await saveItem('userAge',userData.Age);
    await saveItem('userSex',userData.Sex);
    await saveItem('userMaritalStatus',userData.maritalStatus);
    await saveItem('userAddress',userData.address);
  }

  export const getUserInfo = async() => {
  
    var userAgeInstorages = await getItem('userAge');
    var userSexInStore = await getItem('userSex');
    var userMaritalStatusInstore = await getItem('userMaritalStatus');
    var userAddressInstore = await getItem('userAddress');
    var userEmailInstore = await getItem('email');
    const currentUserInfo = {
    
      userAge: userAgeInstorages,
      userSex: userSexInStore,
      userMaritalStatus: userMaritalStatusInstore,
      userAddress:userAddressInstore,
      userEmail:userEmailInstore
    }
    return currentUserInfo;
  }