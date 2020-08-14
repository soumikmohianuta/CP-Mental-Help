import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { List, Card, ActivityIndicator, Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getMentalProfileState, fetchPersonalData } from '../../services/firebase';
import { CoronaProfile } from './corona-profile';
import { PsychoticProfile } from './psychotic-profile';
import { SuicideIdeationProfile } from './suicide-ideation';
import { DomesticViolenceProfile } from './domestic_violence';
import { UserContext } from '../../context';
import { SexMapper, MaritalStatusMapper, CurrentLocationMapper } from './contents';
import { CoronaExerciseVideoScreen } from './corona-profile/corona-excercise';
import { MENTAL_HEALTH_PROFILE_SECTIONS as staticResources } from './contents';
import { HelpCenterProfile } from './help-center';
import { isNetworkAvailable } from '../../utils/network';
import NetInfo from "@react-native-community/netinfo";
const { Navigator, Screen } = createStackNavigator();



const setProfileState = (list: any) => {
  const acc = [...staticResources];
  acc.forEach(function(part, index) {
    acc[index].iconName =  list[index].state ? 'check' : 'cancel';
  });

  return acc;
}

const setDefaultProfileState = () => {
  const acc = [...staticResources];
  return acc;
}

export const ProfileScreenStack = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="Profile" component={ProfileScreen} />
        <Screen name="CoronaProfile" component={CoronaProfile} />
        <Screen name="PsychoticProfile" component={PsychoticProfile} />
        <Screen name="SuicidalIdeationProfile" component={SuicideIdeationProfile} />
        <Screen name="DomesticViolenceProfile" component={DomesticViolenceProfile} />
        <Screen name="CoronaExcercise" component={CoronaExerciseVideoScreen} />
        <Screen name="HelpCenterProfile" component={HelpCenterProfile} />
      </Navigator>
    </NavigationContainer>
  );
}

export const ProfileScreen = ({ route, navigation }: any) => {
  const [basicInformation, setBasicInformation] = useState<any>({});
  const [sexInfo, setSexInfo] = useState("");
  const [addressinfo, setAddressinfo] = useState("");
  const [maritalInfo, setMaritalInfo] = useState("");
  const [emailInfo, setEmailInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [mentalProfileList, setMentalProfileList] = useState<typeof staticResources>([]);
  const { userName, email } = React.useContext(UserContext);



  if (route.params != null) {
    if (route.params.submit) {
      mentalProfileList[route.params.profile].iconName = 'check';
    }
  }

  const setmentalHealthProfile = async () => {
    const profileState = await getMentalProfileState(userName);
    setMentalProfileList(setProfileState(profileState));
  }

  useFocusEffect(
    React.useCallback(() => {
      const getPersonalData = async () => {
        try {
          setLoading(true);
          const isConnected = await isNetworkAvailable();
  
          if (isConnected) {
            const data = await fetchPersonalData(userName);
            await setmentalHealthProfile();
  
            setSexInfo(SexMapper.get(data.userSex) || '');
            setMaritalInfo(MaritalStatusMapper.get(data.userMaritalStatus) || '');
            setAddressinfo(CurrentLocationMapper.get(data.userAddress) || '');
            setEmailInfo(email);
            setBasicInformation(data);
          }
          else {
            throw new Error("Net");
          }
        }
        catch (e) {
          if (e.message == 'Net') {
            alert('নেট সংযোগ নেই,ব্যক্তিগত তথ্য দেখানো যাচ্ছে না');
          }
          else {
            alert('ব্যক্তিগত তথ্য দেখানো যাচ্ছে না');
          }
          setMentalProfileList(setDefaultProfileState());
        } finally {

          setLoading(false);
        }
      }

      getPersonalData();
    }, [])
  );



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
              description={emailInfo}
            />
          </Card.Content>
        </Card>

        <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title="মানসিক স্বাস্থ্যের প্রোফাইল" />
          <Card.Content>
            {
              mentalProfileList.map(({ name, route, iconName }) => (
                <List.Item
                  title={name}
                  right={props => <List.Icon {...props} icon={iconName} />}
                  onPress={() => { navigation.navigate(route) }}
                />
              ))
            }
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};