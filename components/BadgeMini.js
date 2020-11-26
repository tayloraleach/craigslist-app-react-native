import * as React from 'react';
import {Text, View} from 'react-native';
import colors from '../lib/colors';

function BadgeMini({text, size, containerStyles}) {
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
    backgroundColor: colors.grey,
    borderRadius: 2,
  },
  text: {fontSize: 14, color: '#333', fontWeight: 'bold'},
};
export default BadgeMini;
