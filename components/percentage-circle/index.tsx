import React, { useState, useRef, useEffect } from 'react'
import { PanResponder, View, Dimensions } from 'react-native'
import Svg, { Path, Circle, G, Text } from 'react-native-svg'

type PercentageCircleProps = any;

function polarToCartesian(angle: number, dialRadius: number, btnRadius: number) {
  let r = dialRadius;
  let hC = dialRadius + btnRadius;
  let a = (angle-90) * Math.PI / 180.0;

  let x = hC + (r * Math.cos(a));
  let y = hC + (r * Math.sin(a));
  return {x,y};
}

function cartesianToPolar(x: number, y: number, dialRadius: number, btnRadius: number) {
  let hC = dialRadius + btnRadius;

  if (x === 0) {
    return y > hC ? 0 : 180;
  }
  else if (y === 0) {
    return x>hC ? 90 : 270;
  }
  else {
    return (Math.round((Math.atan((y-hC)/(x-hC)))*180/Math.PI) +
      (x>hC ? 90 : 270));
  }
}

function getValue(angle: number, min: number, max: number) {
  return Math.round(angle * (max - min) / 359);
}

function getAngle(value: number, min: number, max: number) {
  return value * 359 / (max - min) ;
}

export const PercentageCircle = (props: PercentageCircleProps) => {
  const {
    xCenter =  Dimensions.get('window').width/2,
    yCenter = Dimensions.get('window').height/2,
    min = 0,
    max = 359,
    dialRadius = 130,
    btnRadius = 15,
    strokeColor = '#ddd',
    strokeWidth = 5,
    fillColor = 'none',
    meterColor = '#ba262b',
    dialWidth = 5,
    textSize = 10,
    textColor = '#fff',
    value,
  } = props;

  const [angle, setAngle] = useState(getAngle(value, min, max));
  const [mount, setMount] = useState(false);
  const panResponder = useRef<any>();

  useEffect(() => {
    if (!mount) {
      panResponder.current =  PanResponder.create({
        onStartShouldSetPanResponder: (e,gs) => true,
        onStartShouldSetPanResponderCapture: (e,gs) => true,
        onMoveShouldSetPanResponder: (e,gs) => true,
        onMoveShouldSetPanResponderCapture: (e,gs) => true,
        onPanResponderMove: (e,gs) => {
          let xOrigin = xCenter - (dialRadius + btnRadius);
          let yOrigin = yCenter - (dialRadius + btnRadius);
          let polarAngle = cartesianToPolar(gs.moveX-xOrigin, gs.moveY-yOrigin, dialRadius, btnRadius);
          let newAngle = 0;
          if (polarAngle <= 0) {
            newAngle = min;
          } else if (polarAngle >= 359) {
            newAngle = max;
          } else {
            newAngle = polarAngle;
          }
        }
      }); 
      setMount(true);
    }
  }, []);

  useEffect(() => {
    setAngle(getAngle(value, min, max))
  }, [value]);

  let width = (dialRadius + btnRadius) * 2;
  let startCoord = polarToCartesian(0, dialRadius, btnRadius);
  let endCoord = polarToCartesian(angle, dialRadius, btnRadius);

  if (!mount) {
    return null;
  }

  return (
    <Svg
      width={width}
      height={width}>
      <Circle r={dialRadius}
        cx={width/2}
        cy={width/2}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fillColor}/>

      <Path stroke={meterColor}
        strokeWidth={dialWidth}
        fill='none'
        d={`M${startCoord.x} ${startCoord.y} A ${dialRadius} ${dialRadius} 0 ${angle > 180 ? 1:0} 1 ${endCoord.x} ${endCoord.y}`}/>

      <G x={endCoord.x-btnRadius} y={endCoord.y-btnRadius}>
        <Circle r={btnRadius}
          cx={btnRadius}
          cy={btnRadius}
          fill={meterColor}
          {...panResponder.current.panHandlers}/>
        <Text x={btnRadius}
          y={btnRadius+(textSize/2)}
          fontSize={textSize}
          fill={textColor}
          textAnchor="middle"
        >{getValue(angle, min, max) +''}</Text>
      </G>
    </Svg>
  );
}