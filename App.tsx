import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomePageStack } from './screens/home';
import { AuthStackScreen } from './screens/login';
import {configureStore} from './redux/store';
import {Provider} from 'react-redux';
import  firebase from 'firebase';
import {AuthContext} from './context/AuthContext'
import { firebaseConfig } from './config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from './screens/profile';;
import { ThemeProvider } from './components/theme';
import { ActivityIndicator } from 'react-native-paper';

const store = configureStore()

const { Navigator, Screen } = createBottomTabNavigator();

export const HomeStackScreen = () => {
  return (
    <Navigator>
          <Screen name="Home" component={HomePageStack} />
          <Screen
            name="Profile"
            component={ProfileScreen}
          />
    </Navigator>
  );
}

firebase.initializeApp(firebaseConfig);

export default function App() {
	  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [firstTimeLoading, setFirstTimeLoading] = React.useState(true);
  const authContext = React.useMemo(() => {
    return {
      signIn: (curUser:any) => {
        setUser(curUser);
      },
      signUp: (curUser:any) =>{
        setFirstTimeLoading(false);
        setUser(curUser);
      },
      signOut: () =>{
        setUser(null);
      },
      saveUserData: ()=>{
        setFirstTimeLoading(true);
      },
    }
  },[]);

  React.useEffect(() =>{
    firebase.auth().onAuthStateChanged(cuser => {
      
       setIsLoading(false);
       if (cuser) {
        setUser(cuser);
       }
   });
  },[]);
  if(isLoading) {
    return <ActivityIndicator animating />;
  }
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AuthContext.Provider value={authContext}> 
          <NavigationContainer>
            {/* {isLoading ? <ActivityIndicator animating />:(user!=null && firstTimeLoading)? <HomeStackScreen/>: <AuthStackScreen/>} */}
            {/* <AuthStackScreen /> */}
            <HomeStackScreen />
          </NavigationContainer>
        </AuthContext.Provider>
      </Provider>
    </ThemeProvider>
  );
}