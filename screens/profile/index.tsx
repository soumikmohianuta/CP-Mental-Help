import React, { useEffect, useState } from 'react';
import { List, Card, ActivityIndicator, Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getProfileState,fetchPersonalData } from '../../services/firebase';
import { CoronaProfile } from '../corona-profile';
import { PsychoticProfile } from '../psychotic-profile';
import {HelpCenterPPScreen} from '../psychotic-profile/helpPP'
import { SuicideIdeationProfile } from '../suicide-ideation';
import { HelpCenterSIScreen } from '../suicide-ideation/helpSI';
import { DomesticViolenceProfile } from '../domestic-violence';
import {HelpCenterDVScreen} from '../domestic-violence/helpDV';
import {UserContext} from '../../context';
import {getUserInfo} from '../../storage';
import {SexMapper,MaritalStatusMapper,CurrentLocationMapper} from './contents';

const { Navigator, Screen } = createStackNavigator();

var MENTAL_HEALTH_PROFILE_SECTIONS = [
  {
    name: 'করোনা সম্পর্কীয়',
    route: 'CoronaProfile',
    iconName:'cancel'
  },
  {
    name: 'গুরুতর সমস্যা সম্পর্কীয়',
    route: 'PsychoticProfile',
    iconName:'cancel'
  },
  {
    name: 'আত্মহত্যা পরিকল্পনা সম্পর্কীয়',
    route: 'SuicidalIdeationProfile',
    iconName:'cancel'
  },
  {
    name: 'ঘরোয়া সহিংসতা সম্পর্কীয়',
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
        <Screen name="DomesticViolenceProfile" component={DomesticViolenceProfile} />
        <Screen name="PsychoticHelp" component={HelpCenterPPScreen} />
        <Screen name="SuicidalIdeationHelp" component={HelpCenterSIScreen} />
        <Screen name="DomesticViolenceHelp" component={HelpCenterDVScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

export const ProfileScreen = ({ route,navigation }: any) => {
  const [basicInformation, setBasicInformation] = useState<any>({});
  const [sexInfo, setSexInfo] = useState("");
  const [addressinfo, setAddressinfo] = useState("");
  const [maritalInfo, setMaritalInfo] = useState("");
  const [loading, setLoading] = useState(true);

  const {userName, email} = React.useContext(UserContext);

  const setProfileState= async (profileState:any) =>{
    for (var i = 0; i < profileState.length; i++) {
      if (profileState[i]) {
        MENTAL_HEALTH_PROFILE_SECTIONS[i].iconName = 'check';
      }
    }
 
  }
  if(route.params != null){
    MENTAL_HEALTH_PROFILE_SECTIONS[route.params.MentalProfileState].iconName = 'check';
  }
  
  useEffect(() => {
    const getPersonalData = async () => {
      try {
        const data = await fetchPersonalData(userName);
        const profileState = await getProfileState(userName);
        setSexInfo(SexMapper.get(data.userSex)|| '');
        setMaritalInfo(MaritalStatusMapper.get(data.userMaritalStatus)|| '');
        setAddressinfo(CurrentLocationMapper.get(data.userAddress)|| '');
        setProfileState(profileState);
        setBasicInformation(data);
      } catch(e) {
        alert('ব্যক্তিগত তথ্য দেখানো যাচ্ছে না');
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
        <Appbar.Content title="প্রোফাইল" />
      </Appbar.Header>
      <ScrollView>
        <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title="ব্যক্তিগত তথ্যাবলি" />
          <Card.Content>
            <List.Item
              title="বয়স"
              description={basicInformation.userAge}
            />
            <List.Item
              title="লিঙ্গ"
              description={sexInfo}
            />
            <List.Item
              title="বৈবাহিক অবস্থা"
              description={maritalInfo}
            />
            <List.Item
              title="বর্তমান অবস্থান"
              description={addressinfo}
            />
            <List.Item
              title="ই-মেইল"
              description={email}
            />
          </Card.Content>
        </Card>
      
        <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title="মানসিক স্বাস্থ্যের প্রোফাইল" />
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