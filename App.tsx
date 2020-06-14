import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebaseConfig } from './config';
import { HomeScreen } from './screens/home';
import { LoadingScreen } from './screens/loading';
import { CurrentStateScreen } from './screens/current-state';
import { MentalStateMeasureScreen } from './screens/mental-state-measure';
import  firebase from 'firebase';
import { SignUpScreen  } from './screens/signup';
import { SignInScreen  } from './screens/login';
import {AuthContext} from './context/AuthContext'
import {UserInfo} from './screens/UserInfo'

firebase.initializeApp(firebaseConfig);
const { Navigator, Screen } = createStackNavigator();
const ClinetProfile = createStackNavigator();
const AuthStack = createStackNavigator();



const AuthStackScreen = () =>(
  <AuthStack.Navigator>

          <AuthStack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }}/>
          <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }}/>
          <AuthStack.Screen name="UserInfo" component={UserInfo} options={{ title: 'User Info' }}/>
  </AuthStack.Navigator>
)


const ClientScreen = () =>(
  <ClinetProfile.Navigator>
         <ClinetProfile.Screen name="Home" component={HomeScreen} />
          <ClinetProfile.Screen
            options={{ title: 'আপনার বর্তমান অবস্থা' }}
            name="CurrentState"
            component={CurrentStateScreen}
          />
          <ClinetProfile.Screen
            options={{ title: 'মানসিক অবস্থার পরিমাপ' }}
            name="MentalStateMeasure"
            component={MentalStateMeasureScreen}
          />
  </ClinetProfile.Navigator>
  )


export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [firstTimeLoading, setFirstTimeLoading] = React.useState(true);
  const authContext = React.useMemo(() =>{
    return{
      signIn: (curUser:any) =>{
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
      user,
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
  if(isLoading){
    return <LoadingScreen/>;
  }
  return (
    <ThemeProvider>
      <AuthContext.Provider value={authContext}> 
      <NavigationContainer>
        {isLoading? <LoadingScreen/>:(user && firstTimeLoading)? <ClientScreen/>: <AuthStackScreen/>}
      </NavigationContainer>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}