import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {PercentageCircle} from '../../components/percentage-circle';
import { createStackNavigator } from '@react-navigation/stack';
import {CoronaProfile} from './coronaProfile';
import {DomesticViolenceProfile} from './domesticViolence';
import {PsychoticProfile} from './psychoticProfile';
import {SuicideIdeationProfile} from './suicideIdeation';
import  firebase from 'firebase';

const { Navigator, Screen } = createStackNavigator();

export const MentalProfileStack = () => {
  return (
    <Navigator>
        <Screen name="MentalProfile" component={MentalProfile} options={{ title: 'Mental Profile' }}/>
        <Screen name="CoronaProfile" component={CoronaProfile} options={{ title: 'Corona Information' }}/>
        <Screen name="PsychoticProfile" component={PsychoticProfile} options={{ title: 'Psychotic Information' }}/>
        <Screen name="SuicideIdeationProfile" component={SuicideIdeationProfile} options={{ title: 'Suicide Ideation Information' }}/>
        <Screen name="DomesticViolenceProfile" component={DomesticViolenceProfile} options={{ title: 'Domestic Violence Information' }}/>

    </Navigator>
  );
}

export const MentalProfile = ({ navigation }: any ) => {
    const [profileProgress, SetProfileProgress] = useState(0);
    const [cpComplete, SetcpComplete] = useState("close");
    const [psComplete, SetpsComplete] = useState("close");
    const [siComplete, SetsiComplete] = useState("close");
    const [dvComplete, SetdvComplete] = useState("close");
    const [isLoading, setIsloading] = useState(true);

    function navigateToCoronaProfile(){
        navigation.navigate('CoronaProfile');
    }

    function navigateToPsychoticProfile() {
        navigation.navigate('PsychoticProfile');
    }

    function navigateToSuicideIdeationProfile() {
        navigation.navigate('SuicideIdeationProfile');
    }

    function navigateToDomesticViolenceProfile(){
        navigation.navigate('DomesticViolenceProfile');
    }

    function updateAllStae(){
      try{
        setIsloading(true);
        firebase.database().ref('/MentalProfile/' + userID).once('value').then(function(snapshot) {
          if (snapshot.exists()) {
            const userData = snapshot.numChildren();
            const curProgress = Math.floor((snapshot.numChildren()/4)*100);
            SetProfileProgress(curProgress);

            if(snapshot.val().CoronaProfile) {
              SetcpComplete("check");
            }
            if(snapshot.val().PsychoticProfile){
              SetpsComplete("check");
            }
            if(snapshot.val().SuicideIdeationProfile){
              SetsiComplete("check");
            }
            if(snapshot.val().DomesticViolenceProfile){
              SetdvComplete("check");
            }
          }
          
        });
        setIsloading(false);
      }
      catch{
        setIsloading(false);
        alert("Error");
      }
    }
   //const userID = useSelector(state => state.loginReducer.userId);
   const [userID, SetUserID] = React.useState("zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2");
  

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        updateAllStae();
       // alert(dvComplete);
        // The screen is focused
        // Call any action
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, []);

    if (isLoading) {
      return (
        <ActivityIndicator animating />
      );
    }


  return (
    <SafeAreaView>
      <ScrollView>
        <Card>
          <Card.Title title="Mental Profile Complete status" />
          <PercentageCircle 
            value={profileProgress}
            min={0}
            max={100}
            btnRadius={10}
            dialWidth={5}
            strokeWidth={5}
            textSize={12}
            dialRadius={40}
          />
        </Card>
        <Card>
          <Card.Title title="Menal Health Fields" />
          <Card.Content>
            <Button icon={cpComplete} onPress={() => navigateToCoronaProfile()}>
              Corona
            </Button>
            <Button icon={psComplete} onPress={() => navigateToPsychoticProfile()}>
              Psychotic
            </Button>
            <Button icon={siComplete} onPress={() => navigateToSuicideIdeationProfile()}>
              Suicidal Ideation
            </Button>
            <Button icon={dvComplete} onPress={() => navigateToDomesticViolenceProfile()}>
              Domestic violence
            </Button>
          </Card.Content>
        </Card>
        </ScrollView>
    </SafeAreaView>
  );
}

