import * as React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import colors from '../lib/colors';
import {useNavigation} from '@react-navigation/native';

function SearchResultItem({item}) {
  const {title, price, hood, images} = item;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SearchResultDetail', item)}
      activeOpacity={0.75}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        marginBottom: 10,
      }}>
      {images[0] && (
        <Image
          resizeMode={'cover'}
          style={{width: 70, height: 70, zIndex: 2, marginRight: 'auto'}}
          source={{
            uri: images[0],
          }}
        />
      )}
      <View
        style={{
          height: '100%',
          width: '100%',
          paddingLeft: 80,
          paddingRight: 5,
          paddingTop: 5,
          paddingBottom: 30,
        }}>
        <Text st>{title}</Text>
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            paddingVertical: 4,
            paddingHorizontal: 6,
            backgroundColor: colors.purple,
          }}>
          <Text style={{color: 'white'}}>{price}</Text>
        </View>

        {/* <Text>{hood}</Text> */}
      </View>
    </TouchableOpacity>
  );
}

export default SearchResultItem;
