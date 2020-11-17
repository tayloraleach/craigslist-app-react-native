import * as React from 'react';
import {Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../lib/colors';

function HomeScreen({navigation}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
      }}>
      <TextInput
        placeholder="Search..."
        onChangeText={term => setSearchTerm(term)}
        value={searchTerm}
        style={{
          height: 50,
          borderColor: '#ccc',
          paddingLeft: 15,
          borderWidth: 1,
          borderRightWidth: 0,
          flex: 1,
        }}
      />
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          width: 100,
          height: 50,
          backgroundColor: colors.purple,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() =>
          navigation.navigate('SearchResults', {
            searchTerm,
          })
        }>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
