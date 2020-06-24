import React, { useState } from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

export const RadioButtonGroup = ({
  defaultValue,
  onSelect,
  options,
}: any) =>  {
  const [value, setValue] = useState(defaultValue);
  const onValueChange =(value: any) => {
    setValue(value);
    onSelect && onSelect(value);
  }
  return(
    <RadioButton.Group
      onValueChange={onValueChange}
      value={value}
    >
      {
        options.map((item: any, index: number) => (
          <RadioButton.Item label={item.label} value={item.value} key={index} />
        ))
      }
    </RadioButton.Group>
  )
}