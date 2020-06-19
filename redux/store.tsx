import { createStore, combineReducers } from 'redux';
import {loginReducer} from './loginReducer';
const rootReducer = combineReducers(
{
     loginReducer: loginReducer }
);
export const configureStore = () => {
    return createStore(rootReducer);
}
