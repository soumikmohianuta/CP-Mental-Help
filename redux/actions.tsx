import {SET_LOGIN_STATE} from './actionTypes';

// this is what our action should look like which dispatches the "payload" to reducer
export const setLoginState = (loginData:any) => {
  return {
    type: SET_LOGIN_STATE,
    payload: loginData,
  };
};
