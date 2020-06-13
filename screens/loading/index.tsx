import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View,ActivityIndicator, Alert } from 'react-native';
import { useForm } from "react-hook-form";
import { Text} from 'react-native-elements';
import firebase from 'firebase';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled(Text)`
  color: red;
`;



export const LoadingScreen = ({ navigation }: any) => {
  const { control, handleSubmit, errors } = useForm();
  const [loginError, setLoginError] = useState('');


  

  return (
      
    <Container>
            <ActivityIndicator size="large" />           
    </Container>
  );
  

}