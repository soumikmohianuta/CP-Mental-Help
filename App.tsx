import 'react-native-gesture-handler';

import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { HomePageStack } from './screens/home';
import { SignInScreen } from './screens/login';
import  firebase from 'firebase';
import { firebaseConfig } from './config';
import { ProfileScreenStack } from './screens/profile';;
import { ThemeProvider } from './components/theme';
import { ActivityIndicator } from 'react-native-paper';
import { SettingsScreen } from './screens/settings';
 
const HomeNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'profile', title: 'Profile', icon: 'album' },
    { key: 'settings', title: 'Settings', icon: 'settings' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomePageStack,
    profile: ProfileScreenStack,
    settings: SettingsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
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
        {/* {isLoading ? <ActivityIndicator animating />:(user!=null && firstTimeLoading)? <HomeStackScreen/>: <AuthStackScreen/>} */}
        {/* <SignInScreen /> */}
        <HomeNavigation />
    </ThemeProvider>
  );
}