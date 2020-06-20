import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';


const TouchableContainer = styled(TouchableOpacity)`
    height: 20;
    width: 20;
    border-radius: 10;
    border-width: 1;
    border-color: #DCDCDC;
    align-items: center;
    justify-content: center;
    margin-right: 20;
   
    
`;


const ViewContainer = styled(View)`
    margin: 5px 5px;
    align-items: center;
    flex-direction: row;
`;

const CheckedContainer = styled(View)`
    width: 14;
    height: 14;
    border-radius: 7;
    background-color:#B82204;
    
`;


const TextContainer = styled(Text)`
  font-size: 20;
  color: #423C3B;
`;

export const RadioButton = (props: any) => {
    const select = (value: any) => {
     props.onSelecting(value);
    }
   return (
    <ViewContainer>
     <TouchableContainer onPress={() => select(props.value)}
     >
      { props.selected === props.value && 
        (<CheckedContainer />) }
     </TouchableContainer>
     <TextContainer>{props.label}</TextContainer>
    </ViewContainer>
   )}