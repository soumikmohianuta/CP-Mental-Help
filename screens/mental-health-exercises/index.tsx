import React, { useState, useEffect, useContext, } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Appbar, List,ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { resources as staticResources } from './content';
import { getMentalHealthExcercise } from '../../services/firebase';
import { UserContext } from '../../context';
import {getExerciseList} from '../../utils/exercise';
import { isNetworkAvailable } from '../../utils/network';

const mapResources = (list: any) => {
  const acc = [...staticResources];
  acc.forEach(function(part, index) {
    acc[index].iconName =  list[acc[index].content_id] ==1? 'check' : 'cancel';

  });
  return acc;
  console.log(acc);
}


export const MentalHealthExerciseScreen = ({ route, navigation }: any) => {
  const [expanded, setExpanded] = useState(true);
 // const [exerciseList, setExerciseList] = useState([]);
  const [resources, setResources] =  useState<typeof staticResources>([]);
  const { userName: userId } = useContext(UserContext);
  const { navigateTo } = route.params;
  const [loading, setLoading] = useState(true);


  useFocusEffect(
    React.useCallback(() => {
        const fetchMentalHealthExercise = async () => {
          setLoading(true);
          try{

            const isConnected = await isNetworkAvailable();
            if (isConnected) {
          
                const list = await getMentalHealthExcercise(userId);
  
                setResourceAndList(list);
            }
            else{
              throw new Error("Net") ;
            }             
        }
        catch (error){
          if(error.message=="Net"){
            alert('ইন্টারনেট সংযোগ নেই,অগ্রগতি দেখানো যাচ্ছে না');
          }
          else{
            alert("আপনার অগ্রগতি দেখানো যাচ্ছে না");
          }

          const list = getExerciseList();
          setResourceAndList(list);
      
   
        }
        finally{
          setLoading(false);
        }
      }
      
      fetchMentalHealthExercise();
    }, [])
  );


  const onClick = async (item: any) => {
    navigation.navigate('ExerciseVideo', {
      exercise: item
    })
  }

  const setResourceAndList = (list: any) => {
    //setExerciseList(list);
    setResources(mapResources(list));
  }
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate(navigateTo)}  />
        <Appbar.Content title="মানসিক স্বাস্থ্যের গুণগত মান উন্নয়ন" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginTop: 32 }}>
        <List.Accordion
          title="অনুশীলন সমূহ"
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