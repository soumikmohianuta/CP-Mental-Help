import React, { useEffect, useState } from 'react';
import { List, Card, ActivityIndicator, Appbar } from 'react-native-paper';
import { ScrollView, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { fetchPersonalData } from '../../services/firebase';
import { CoronaProfile } from './coronaProfile';
import { PsychoticProfile } from './psychoticProfile';
import { SuicideIdeationProfile } from './suicideIdeation';
import { DomesticViolenceProfile } from './domesticViolence';
const { Navigator, Screen } = createStackNavigator();

const MENTAL_HEALTH_PROFILE_SECTIONS = [
  {
    name: 'Corona',
    route: 'CoronaProfile'
  },
  {
    name: 'Psychotic',
    route: 'PsychoticProfile'
  },
  {
    name: 'Suicidal Ideation',
    route: 'SuicidalIdeationProfile'
  },
  {
    name: 'Domestic violence',
    route: 'DomesticViolenceProfile'
  },
];

export const ProfileScreenStack = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="Profile" component={ProfileScreen} />
        <Screen name="CoronaProfile" component={CoronaProfile} options={{ title: 'Corona Information' }}/>
        <Screen name="PsychoticProfile" component={PsychoticProfile} options={{ title: 'Psychotic Information' }}/>
        <Screen name="SuicidalIdeationProfile" component={SuicideIdeationProfile} options={{ title: 'Suicide Ideation Information' }}/>
        <Screen name="DomesticViolenceProfile" component={DomesticViolenceProfile} options={{ title: 'Domestic Violence Information' }}/>
      </Navigator>
    </NavigationContainer>
  );
}

export const ProfileScreen = ({ navigation }: any) => {
  const [basicInformation, setBasicInformation] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPersonalData = async () => {
      try {
        const data = await fetchPersonalData('zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2');
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
              MENTAL_HEALTH_PROFILE_SECTIONS.map(({ name, route }) => (
                <List.Item
                  title={name}
                  right={props => <List.Icon {...props} icon="check" />}
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