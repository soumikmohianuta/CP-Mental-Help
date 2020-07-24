import React, { useEffect, useState } from 'react';
import { List, Card, ActivityIndicator, Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { fetchPersonalData,getProfileState } from '../../services/firebase';
import { CoronaProfile } from '../corona-profile';
import { PsychoticProfile } from '../psychotic-profile';
import {HelpCenterPPScreen} from '../psychotic-profile/helpPP'
import { SuicideIdeationProfile } from '../suicide-ideation';
import {SuicideIdeationNextProfile} from '../suicide-ideation/nextProfile';
import { HelpCenterSIScreen } from '../suicide-ideation/helpSI';
import { DomesticViolenceProfile } from '../domestic-violence';
import {HelpCenterDVScreen} from '../domestic-violence/helpDV';
import {UserContext} from '../../context';

const { Navigator, Screen } = createStackNavigator();

var MENTAL_HEALTH_PROFILE_SECTIONS = [
  {
    name: 'Corona',
    route: 'CoronaProfile',
    iconName:'cancel'
  },
  {
    name: 'Psychotic',
    route: 'PsychoticProfile',
    iconName:'cancel'
  },
  {
    name: 'Suicidal Ideation',
    route: 'SuicidalIdeationProfile',
    iconName:'cancel'
  },
  {
    name: 'Domestic violence',
    route: 'DomesticViolenceProfile',
    iconName:'cancel'
  },
];

export const ProfileScreenStack = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="Profile" component={ProfileScreen} />
        <Screen name="CoronaProfile" component={CoronaProfile}/>
        <Screen name="PsychoticProfile" component={PsychoticProfile} />
        <Screen name="SuicidalIdeationProfile" component={SuicideIdeationProfile} />
        <Screen name="SuicidalIdeationNextProfile" component={SuicideIdeationNextProfile} />
        <Screen name="DomesticViolenceProfile" component={DomesticViolenceProfile} />
        <Screen name="PsychoticHelp" component={HelpCenterPPScreen} />
        <Screen name="SuicidalIdeationHelp" component={HelpCenterSIScreen} />
        <Screen name="DomesticViolenceHelp" component={HelpCenterDVScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

export const ProfileScreen = ({ navigation }: any) => {
  const [basicInformation, setBasicInformation] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const {userName} = React.useContext(UserContext);

  const setProfileState= async (profileState:any) =>{
    for (var i = 0; i < profileState.length; i++) {
      if (profileState[i]){
        MENTAL_HEALTH_PROFILE_SECTIONS[i].iconName = 'check';
      }
    }
 
  }

  useEffect(() => {
    const getPersonalData = async () => {
      try {
        const data = await fetchPersonalData(userName);
        const profileState = await getProfileState(userName);
        setProfileState(profileState);
        setBasicInformation(data);
      } catch(e) {
        alert('Get Personal Data Error');
      } finally {
        setLoading(false);
      }
    }
    getPersonalData();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <ScrollView>
        <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title="Basic Profile" />
          <Card.Content>
            <List.Item
              title="বয়স"
              description={basicInformation.age}
            />
            <List.Item
              title="লিঙ্গ"
              description={basicInformation.sex}
            />
            <List.Item
              title="বৈবাহিক অবস্থা"
              description={basicInformation.maritalStatus}
            />
            <List.Item
              title="বর্তমান অবস্থান"
              description={basicInformation.address}
            />
            <List.Item
              title="ই-মেইল"
              description={basicInformation.address}
            />
          </Card.Content>
        </Card>
      
        <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title="Mental Health Profile" />
          <Card.Content>
            {
              MENTAL_HEALTH_PROFILE_SECTIONS.map(({ name, route, iconName }) => (
                <List.Item
                  title={name}
                  right={props => <List.Icon {...props} icon={iconName} />}
                  onPress={() => { navigation.navigate(route)}}
                />
              ))
            }
          </Card.Content>
        </Card>
      </ScrollView>
    </>  
  );
};