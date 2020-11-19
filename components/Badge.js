import * as React from 'react';
import {Text, View} from 'react-native';
import colors from '../lib/colors';

function Badge({text, size, containerStyles}) {
  const styledText = {
    ...styles.text,
    fontSize: size ? size : styles.text.fontSize,
  };
  return (
    <View style={{...styles.root, ...containerStyles}}>
      <Text style={styledText}>{text}</Text>
    </View>
  );
}

const styles = {
  root: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: colors.purple,
    borderRadius: 2,
  },
  text: {fontSize: 14, color: 'white', fontWeight: 'bold'},
};
export default Badge;
