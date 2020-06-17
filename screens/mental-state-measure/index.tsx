import React from 'react';
import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-elements';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  margin-top: 40px;
`;

const roundButtonStyle = {
  height: 50,
  borderRadius: 25,
  marginBottom: 16,
};


export const MentalStateMeasureScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <Container>
        <Text style={{marginBottom: 20, fontSize: 22}}>
          নিচের যেকোন একটি পদ্ধতি দিয়ে পরিমাপ করুন আপনার মানসিক অবস্থা
        </Text>
      <Card title='মানসিক অবস্থা যাচাইকরণ'>
          <Text style={{marginBottom: 20, fontSize: 22}}>
           এই পদ্ধতির পরিমাপ স্কেলঃ GHQ-12
          </Text>
          <Button
            buttonStyle={roundButtonStyle}
            title="চলুন শুরু করি"
            type="clear"
            onPress={() => navigation.navigate('CurrentState')}
          />
        </Card>
        <Card title='মানসিক চাপ নির্ণয়'>
          <Text style={{marginBottom: 20, fontSize: 22}}>
           এই পদ্ধতির পরিমাপ স্কেলঃ PSS 10
          </Text>
          <Button
            buttonStyle={roundButtonStyle}
            title="চলুন শুরু করি"
            type="clear"
            onPress={() => navigation.navigate('CurrentState')}
          />
        </Card>
        <Card title='দুশ্চিন্তা নির্ণয়'>
          <Text style={{marginBottom: 20, fontSize: 22}}>
            এই পদ্ধতির পরিমাপ স্কেলঃ Anxiety
          </Text>
          <Button
            buttonStyle={roundButtonStyle}
            title="চলুন শুরু করি"
            type="clear"
            onPress={() => navigation.navigate('CurrentState')}
          />
        </Card>
      </Container>
    </ScrollView>
  );
}