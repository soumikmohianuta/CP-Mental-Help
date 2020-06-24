// https://aboutreact.com/react-native-tab //
import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import styled from 'styled-components/native';
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


const MainContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
`;

const ScoreContainer = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: column;
  `;


  const FieldContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 12px;
`;


const ButtonContainer = styled(Button)`
  display: flex;
  flex-direction: column;
  padding: 2px 2px;
  `;

export const MentalProfile = ({ navigation }: any ) => {
    const [profileProgress, SetProfileProgress] = React.useState(0);

    function navigateToCoronaProfile(){
        navigation.navigate('CoronaProfile');
    }

    function navigateToPsychoticProfile(){
        navigation.navigate('PsychoticProfile');
    }

    function navigateToSuicideIdeationProfile(){
        navigation.navigate('SuicideIdeationProfile');
    }

    function navigateToDomesticViolenceProfile(){
        navigation.navigate('DomesticViolenceProfile');
    }
    const [userID, SetUserID] = React.useState("zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2");

    //const userID = useSelector(state => state.loginReducer.userId);
  
    React.useEffect(() =>{
      try{
            firebase.database().ref('/MentalProfile/' + userID).once('value').then(function(snapshot) {
              if (snapshot.exists()){
                const userData = snapshot.numChildren();
              //  alert(userData);
                const curProgress = Math.floor((userData/4)*100);
                SetProfileProgress(curProgress);
              }
            });
          }
          catch{
            alert("Error");
          }
    },[]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
      <View style={{ flex: 1 , padding: 16}}>
      <Card title='Mental Profile Complete status' containerStyle={{ borderRadius: 8, width: '95%' }}>
        <MainContainer>
        <ScoreContainer>
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
        </ScoreContainer>
        </MainContainer>
        </Card>
        
        <Card title='Menal Health Fields' containerStyle={{ borderRadius: 8, width: '95%', marginBottom: 64 }}>
        <Button
          type="clear"
          title="Corona"
          titleStyle={{
            color: '#ba262b'
          }}
          onPress={() => navigateToCoronaProfile()}
        />
        <Button
          type="clear"
          title="Psychotic"
          titleStyle={{
            color: '#ba262b'
          }}
          onPress={() => navigateToPsychoticProfile()}
        />
        <Button
          type="clear"
          title="Suicidal Ideation"
          titleStyle={{
            color: '#ba262b'
          }}
          onPress={() => navigateToSuicideIdeationProfile()}
        />
        <Button
          type="clear"
          title="Domestic violence"
          titleStyle={{
            color: '#ba262b'
          }}
          onPress={() => navigateToDomesticViolenceProfile()}
        />
    </Card>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

