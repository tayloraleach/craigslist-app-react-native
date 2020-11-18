import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import colors from '../lib/colors';

export default function Loader() {
  return (
    <View style={styles.root}>
      <ActivityIndicator size={'large'} color={colors.purple} />
    </View>
  );
}
const styles = {
  root: {flex: 1, alignItems: 'center', justifyContent: 'center'},
};
