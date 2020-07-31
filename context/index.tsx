import React from 'react';
import {getItem,saveItem} from '../storage'

const defaultAuthContext = {
    
    signIn: (curUser: any) => {},
    signOut: () => {},
  }

  var contextUsername= "";
  var contextDisplayname= "";
  var contextEmail= "";

  export const getUserContext = (curUser:any) => {
    const curContext = {
      userName : curUser.user.uid,
      displayName:  curUser.user.displayName,
      email : curUser.user.email
    }
    return curContext;
  }

  export const getUserContextFromStorage = (curUser:any) => {
    const curContext = {
      userName : curUser.username,
      displayName:  curUser.displayName,
      email : curUser.email
    }
    return curContext;
  }

  export const baseUserContext = {
    
    userName: '',
    displayName:'',
    email:''
  }

export const AuthContext = React.createContext(defaultAuthContext);
export const UserContext = React.createContext(baseUserContext);



