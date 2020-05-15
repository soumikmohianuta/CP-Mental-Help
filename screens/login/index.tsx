import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { useForm,Controller } from "react-hook-form";
import { Text, Button, Input } from 'react-native-elements';

const Container = styled(View)`
  flex: 1;
  padding: 72px 24px;
`;

const ErrorText = styled(Text)`
  color: red;
`;

export const LoginScreen = ({ navigation }: any) => {
  const { control, handleSubmit, errors } = useForm();
  const [loginError, setLoginError] = useState('');

  const onSubmit = (data: Record<string, any>) => {
    // TODO: Login API
    if (data.email == 'A' && data.password == '1') {
      navigation.navigate('InitialQuestionnaire');
    } else {
      setLoginError('Incorrect email or password');
    }
  }

  return (
    <Container>
      <Text h3> Welcome!</Text>
      <Controller
        as={Input}
        control={control}
        name="email"
        onChange={args => args[0].nativeEvent.text}
        rules={{ required: true }}
        defaultValue=""
        placeholder="Email"
      />
      {errors.email && <ErrorText>This is required.</ErrorText>}

      <Controller
        as={Input}
        control={control}
        name="password"
        onChange={args => args[0].nativeEvent.text}
        defaultValue=""
        placeholder="Password"
        secureTextEntry={true}
        rules={{ required: true }}
      />
      {errors.password && <ErrorText>This is required.</ErrorText>}
      {<ErrorText>{loginError}</ErrorText>}
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}