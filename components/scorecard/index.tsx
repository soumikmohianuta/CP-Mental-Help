import React, { useRef, useState } from 'react';
import { PanResponder, View } from 'react-native';
import Svg, {
  Circle, G, LinearGradient, Path, Defs, Stop,
} from 'react-native-svg';

const { PI, cos, sin, atan2 } = Math;

const calculateAngle = (pos: number, radius: number) => {
  const startAngle = ((2 * PI) - (PI * -0.5));
  const endAngle = (PI + (PI * pos));

  const x1 = -radius * cos(startAngle);
  const y1 = -radius * sin(startAngle);

  const x2 = -radius * cos(endAngle);
  const y2 = -radius * sin(endAngle);

  return { x1, y1, x2, y2 };
};

const percentToPos = (percent: number, max: number) => (2 / max * percent) - 0.5;
const posToPercent = (pos: number, max: number) => max * (pos + 0.5) / 2;

const selectGradient = (gradients: number, pos: number, max: number) => {
  const current = posToPercent(pos, max);
  let selected: number = 0;

  for (const [key] of Object.entries(gradients)) {
    if (key as unknown as number > selected && key as unknown as number < current) {
      selected = key as unknown as number;
    }
  }

  return gradients[selected];
};

const ScoreCard = ({
  size,
  strokeWidth = 30,
  defaultPos = 0,
  gradients = {
    0: ['rgb(255, 97, 99)', 'rgb(247, 129, 119)'],
  },
  backgroundColor = 'rgb(231, 231, 231)',
  children,
  max=100
}: any) => {
  const [pos] = useState(percentToPos(defaultPos, max));
  const circle = useRef(null);

  const padding = 8;
  const radius = (size - strokeWidth) / 2 - padding;
  const gradient = selectGradient(gradients, pos, max);

  const { x1, y1, x2, y2 } = calculateAngle(pos, radius);
  const d = `
    M ${x2.toFixed(3)} ${y2.toFixed(3)}
    A ${radius} ${radius}
    ${(pos < 0.5) ? '1' : '0'} ${(pos > 0.5) ? '1' : '0'} 0
    ${x1.toFixed(3)} ${y1.toFixed(3)}
  `;

  return (
    <Svg
      height={size}
      width={size}
      ref={circle}
      style={{ marginLeft: 'auto', marginRight: 'auto' }}
    >
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
          <Stop offset="0" stopColor={gradient[0]} />
          <Stop offset="1" stopColor={gradient[1]} />
        </LinearGradient>
      </Defs>
      <G transform={{ translate: `${strokeWidth / 2 + radius + padding}, ${strokeWidth / 2 + radius + padding}` }}>
        <Circle
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          stroke={backgroundColor}
        />
        <Path
          d={d}
          strokeWidth={strokeWidth}
          stroke={`url(#grad)`}
          fill="none"
        />
      </G>
      {
      children && (
        <View style={{
            height: size,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <View>{children}</View>
        </View>
      )}
    </Svg>
  );
}

export default ScoreCard;