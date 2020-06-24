import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View,ActivityIndicator } from 'react-native';
import { useForm } from "react-hook-form";

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
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