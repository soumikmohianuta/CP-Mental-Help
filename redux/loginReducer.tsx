import {SET_LOGIN_STATE,GET_LOGIN_STATE} from './actionTypes';

export const initialState = {
        userId: 'a',
        email: '',
        name: '',
  };


export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload
     //   userId:action.payload.userID, // this is what we expect to get back from API call and login page input
     //   email:action.payload.email,
   //     lastName:action.payload.lastName,
   //     firstName:action.payload.firstName
      };
    default:
      return state;
  }
};