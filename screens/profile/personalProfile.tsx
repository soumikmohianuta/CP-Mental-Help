import * as React from 'react';
import { TouchableOpacity,ScrollView,Image, StyleSheet, View, Text, SafeAreaView,ActivityIndicator } from 'react-native';
import { Button, Card } from 'react-native-elements';
import styled from 'styled-components/native';
import {useSelector  } from 'react-redux';
import  firebase from 'firebase';
import { LoadingScreen } from '../loading';

const Container = styled(View)`
  flex: 7;
  flex-direction: column;
  align-items: center;
`;


const ImageContainer = styled(Image )`
  flex: 1;
  height: undefined;
  width: 80%;
  flex-direction: column;
  align-self: center;
  resize-mode: contain;
`;

const ImageViewContainer = styled(View )`
  flex: 2;
  flex-direction: column;
  align-items: center;
`;


 
const ScrollContent = styled(View)`
  width: 100%;
  margin-top: 5; 
  margin-bottom: 5; 
  flex-direction: row;
`;

const FieldContainer = styled(Text)`
  color: #746F6E;
`;
const ValueContainer = styled(Text)`
  color: #B82204;
`;


export const PersonalProfile = ({ navigation }: any ) => {
  var appLogo =  require('../../Images/QLife.png');
  const [age, SetAge] = React.useState(0);
  const [sex, SetSex] = React.useState("");
  const [maritalStatus, SetMaritalStatus] = React.useState("");
  const [address, SetAddress] = React.useState("");
  const [email, SetEmail] = React.useState("");
  const [userID, SetUserID] = React.useState("zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2");
  const [isLoading, setIsloading] = React.useState(true);

  //const userID = useSelector(state => state.loginReducer.userId);


  React.useEffect(() =>{
    try{
          firebase.database().ref('/DemoGraphy/' + userID).once('value').then(function(snapshot) {
            SetAge(snapshot.val() && snapshot.val().Age || 'Anonymous');
            SetSex(snapshot.val() && snapshot.val().Sex || 'Anonymous');
            SetMaritalStatus(snapshot.val() && snapshot.val().maritalStatus || 'Anonymous');
            SetAddress(snapshot.val() && snapshot.val().address || 'Anonymous');
            SetEmail(snapshot.val() && snapshot.val().Email || 'Anonymous');
            setIsloading(false);
          });
        }
        catch{
          alert("Error");
        }
        
  },[]);

  if (isLoading) {
    return (
      <LoadingScreen/>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ImageViewContainer>
         <ImageContainer   source={appLogo} />
     </ImageViewContainer>
     <Container >
     <Card title='আপনার ব্যক্তিগত তথ্য' containerStyle={{ borderRadius: 8, width: '95%' }}>

    
    <ScrollContent >
           <FieldContainer>• বয়স  </FieldContainer>
           <ValueContainer> {age} </ValueContainer>
      
       </ScrollContent >


       <ScrollContent >
           <FieldContainer>• লিঙ্গঃ </FieldContainer>
           <ValueContainer> {sex} </ValueContainer>
      
       </ScrollContent >

       <ScrollContent >
           <FieldContainer>• বৈবাহিক অবস্থাঃ </FieldContainer>
           <ValueContainer> {maritalStatus} </ValueContainer>

       </ScrollContent >

       <ScrollContent >
           <FieldContainer>• বর্তমান অবস্থানঃ </FieldContainer>
           <ValueContainer> {address} </ValueContainer>
  
       </ScrollContent >
       
       <ScrollContent >
           <FieldContainer>• ই-মেইল </FieldContainer>
           <ValueContainer> {email} </ValueContainer>
  
       </ScrollContent >
  
       </Card>
     </Container>
   </SafeAreaView>
  );
}