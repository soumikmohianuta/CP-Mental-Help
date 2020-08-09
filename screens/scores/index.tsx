import React, { useEffect, useState, useContext } from 'react';
import { Appbar, Text, Headline, Button, Card, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ScoreCard from '../../components/scorecard';
import { View } from 'react-native';

import { SCALE_MAX_VALUE, getLevelByScore, isSevere } from '../../utils/scale';
import { UserContext } from '../../context';
import { SCALE_NAME_MAP, SCALE_NAME_MAP_STEM } from '../../utils/constants';

export const MentalHealthScoreViewScreen = ({ route, navigation }: any) => {
  //const [excerciseStatus, setExcerciseStatus] = useState('');
  const { score, scale } = route.params;
  const { userName: userId } = useContext(UserContext);
  const [severeLabel, setSevereLabel] = useState(false);
  const scaleName = SCALE_NAME_MAP.get(scale);
  const scaleNameStem = SCALE_NAME_MAP_STEM.get(scale);
  const scaleLevel = getLevelByScore(scale, score);

  const onStart = () => {
    navigation.navigate('MentalHealthExercise', { navigateTo: 'MentalHealthScoreView' });
  }

  const onHelpRequire =  () => {
    navigation.navigate('SevereHelpCenterScreen');
  }


  useEffect(() => {
    if (isSevere(scale, score))
      setSevereLabel(true);
    else {
      setSevereLabel(false);
    }
  }, []);


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')} />
        <Appbar.Content title={`${scaleName} পরিমাপ`} />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginTop: 32 }}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Headline> আপনার {scaleName} পরিমাণঃ
        </Headline>
          <Headline style={{ color: 'red' }}> {scaleLevel} মাত্রা</Headline>
        </View>

        <ScoreCard
          size={200}
          defaultPos={score}
          max={SCALE_MAX_VALUE[scale]}
        >
          <Text style={{ fontSize: 76 }}>
            {score}
          </Text>
        </ScoreCard>

        {severeLabel ?
          <>
            <Card elevation={5} style={{ margin: 12, borderRadius: 5, marginTop: 10 }}>

              <Card.Content style={{ margin: 12, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>

                <Paragraph style={{ textAlign: 'justify', fontSize: 15 }}>{`আপনার ${scaleNameStem} ${scaleLevel} মাত্রায় রয়েছে । এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপসের মাধ্যমে দ্রুত সময়ের মধ্যে মানসিক স্বাস্থ্যসেবা প্রফেশনালদের সাথে যোগাযোগ করুন । পাশাপাশি অ্যাপসের ভিডিওগুলো দেখুন ও অনুশীলন করুন ।`}</Paragraph>
                <Button onPress={onHelpRequire}>প্রফেশনালদের সাথে যোগাযোগ করুন</Button>
              </Card.Content>

            </Card>
            <Button mode="contained" onPress={onStart}> অনুশীলন শুরু করুন</Button>

          </> :
          <>
            <Card elevation={5} style={{ margin: 12, borderRadius: 5, marginTop: 10 }}>

              <Card.Content style={{ margin: 12, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>

                <Paragraph style={{ textAlign: 'justify', fontSize: 15 }}>{`আপনার ${scaleNameStem} ${scaleLevel} মাত্রায় রয়েছে । এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপসের ভিডিওগুলো দেখুন ও অনুশীলন করুন।`}</Paragraph>

              </Card.Content>

            </Card>
            <Button mode="contained" onPress={onStart}> অনুশীলন শুরু করুন</Button>
          </>
        }


      </ScrollView>
    </>
  )
}