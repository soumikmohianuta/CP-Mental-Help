import React, { useState, useEffect } from 'react';
import { Appbar, List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { resources as staticResources } from './content';
import { getMentalHealthExcercise, setMentalHealthExcercise, markExcerciseAsDone } from '../../services/firebase';

const mapResources = (list: any) => {
  return staticResources.reduce((acc, item) => {
    acc.push({
      ...item,
      iconName: list[item.content_id] == 1 ? 'check' : 'cancel' 
    })
    return acc;
  }, []);
}

export const MentalHealthExerciseScreen = ({ route, navigation }: any) => {
  const [expanded, setExpanded] = useState(true);
  const [exerciseList, setExerciseList] = useState([]);
  const [resources, setResources] = useState([]);
  const { navigateTo } = route.params;

  useEffect(() => {
    const fetchMentalHealthExercise = async () => {
      const list = await getMentalHealthExcercise('1');
      setResourceAndList(list);
    }
    fetchMentalHealthExercise();
  }, []);

  const onClick = async (item: any) => {
    const newList = {
      ...exerciseList,
      [item.content_id]: 1,
    }
    await markExcerciseAsDone('1', item.content_id);
    setResourceAndList(newList);
  }

  const setResourceAndList = (list: any) => {
    setExerciseList(list);
    setResources(mapResources(list));
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate(navigateTo)}  />
        <Appbar.Content title="মানসিক স্বাস্থ্য উন্নয়নের অনুশীলনী" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginTop: 32 }}>
        <List.Accordion
          title="রিসোর্স সমূহ"
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
          left={props => <List.Icon {...props} icon="folder" />}>
            { resources.length > 0 && 
                resources.map((item: any, index) => (
                  <List.Item
                    title={item.name}
                    right={props => <List.Icon icon={item.iconName} />}
                    onPress={() => onClick(item)}
                  />
                ))
            }
       </List.Accordion>
      </ScrollView>
    </>
  )
}