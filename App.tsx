import 'react-native-gesture-handler';

import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { HomePageStack } from './screens/home';
import { SignInScreen } from './screens/login';
import  firebase from 'firebase';
import { firebaseConfig } from  './services/firebase/config';
import { ProfileScreenStack } from './screens/profile';;
import { ThemeProvider } from './components/theme';
import { ActivityIndicator } from 'react-native-paper';
import { SettingsNavigation } from './screens/settings';
import { AuthStackScreen} from './screens/login';
import { AuthContext, UserContext, baseUserContext,getUserContext,getUserContextFromStorage} from './context';
import {getItem, storeUserContext, deleteItem, getContextFromStorage  } from './storage';



const HomeNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'হোম', icon: 'home' },
    { key: 'profile', title: 'প্রোফাইল', icon: 'album' },
    { key: 'settings', title: 'সেটিংস', icon: 'settings' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomePageStack,
    profile: ProfileScreenStack,
    settings: SettingsNavigation,
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
  const [userName, setUsername] = React.useState("none");
  const [curUserContext, setCurUserContext] = React.useState(baseUserContext);


  const authContext = React.useMemo(() => {
    return {
      signIn: async (curUser:any) => {
        setIsLoading(true);
        const userContext = getUserContext(curUser);
        setCurUserContext(userContext);
        await storeUserContext(curUser);
        setUsername(curUser.user.uid);
        setIsLoading(false);
      },
      signOut: async () =>{
        setIsLoading(true);
        await deleteItem('userName');
        setUsername("none");
        setIsLoading(false);
      },
      setLoading: async () =>{
        setIsLoading(true);
      },
    }
  },[]);

 

  React.useEffect(() =>{
    const checkUser = async () => {
      var userNameInstorages = await getItem('userName');
      if(userNameInstorages != null && userNameInstorages != 'none'){
        const userContext = await getContextFromStorage();
        setCurUserContext(userContext);
        setUsername(userContext.userName);
      }
      setIsLoading(false);
    };
    checkUser();

  },[]);

  if (isLoading)
    return <ActivityIndicator />;

  if (userName=="none" ) {
    return (
      <ThemeProvider>   
        <AuthContext.Provider value={authContext}> 
          <UserContext.Provider value={curUserContext}> 
                {<AuthStackScreen/>}
          </UserContext.Provider> 
        </AuthContext.Provider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>           
      <AuthContext.Provider value={authContext}> 
      <UserContext.Provider value={curUserContext}> 
        {<HomeNavigation/>}
        </UserContext.Provider> 
      </AuthContext.Provider>
    </ThemeProvider>
    );
}