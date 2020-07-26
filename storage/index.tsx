import { AsyncStorage } from 'react-native';
import React from 'react';



export const saveItem = async (key:string, value:string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  export const getItem = async (key:string) => {
    let userId = '';
    try {
      userId = await AsyncStorage.getItem(key) || 'none';
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return userId;
  }

  export const deleteItem = async (key:string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }


  export const checkItemExists = async (key:string) => {
    try {
       const value = await AsyncStorage.getItem(key);
       
       if (value != null){
            return "true";
       }
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return "false";
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