import React, { useState } from "react";
import { Appbar, Card, Paragraph,Button,Headline,ProgressBar,Subheading,Colors} from 'react-native-paper';
import { privacyIntro, sectionOne, sectionTwo, sectionThree, sectionFour, sectionFive, sectionSix, sectionSeven, sectionEight, sectionNine } from './contents';
import { ScrollView } from 'react-native-gesture-handler';
import {

  Image,
  SafeAreaView,
  View
} from "react-native";
import {
  StaemenContent,
} from "./contents";


export const PrivacyScreen = ({ navigation }: any) => {
  const NUMBER_OF_STATEMENTS = StaemenContent.length;
  const [count, setCount] = useState<number>(0);

  const handlePrevious = () => {

    setCount(count - 1);
  }

  const handleNext = () => {

    setCount(count + 1);
  }
  return (
    <> 
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.navigate('Settings')}  />
      <Appbar.Content title="Privacy Statement" />
    </Appbar.Header>
    <ScrollView style={{ margin: 12 }}>
    <Subheading style={{  marginTop: 12, marginBottom: 12 }}> PAGE {count + 1} of {NUMBER_OF_STATEMENTS}</Subheading>
      <ProgressBar
        progress={(count + 1) / NUMBER_OF_STATEMENTS}
        color={Colors.red800}
        style={{ marginBottom: 24 }}
      />
      {
        StaemenContent.map((item: any, index: number) => {
          return index != count ?
            null
            :
            <>
             <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
                  <Card.Title title={item.header} />
                  
                  <Card.Content>
                  { item.blocks.map((itemContent: any, indexContent: number) => {
                          return <><Paragraph  style={{textAlign: 'justify', marginBottom: 10}}>{itemContent.block}</Paragraph></>
                    })}
                  </Card.Content>
                  
             </Card>
            
            </>
        })
      }
      
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12
        }}
      >
          <Button
            onPress={handlePrevious}
            disabled={count === 0}
            mode="outlined"
          >
            Previous
          </Button>
          
            <Button disabled={count === NUMBER_OF_STATEMENTS-1} onPress={handleNext} mode="outlined"> Next </Button>
          
        </View> 

      </ScrollView>

 
      </>
  );
}