import * as React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import colors from '../lib/colors';

function SearchResultDetail({route}) {
  const {title, images, price, hood} = route.params;
  return (
    <View style={{padding: 10, flex: 1}}>
      <Text style={{fontSize: 14, color: colors.purple}}>{hood}</Text>
      <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 10}}>
        {title}
      </Text>
      <Text style={{fontSize: 20, color: colors.purple, marginBottom: 20}}>
        {price}
      </Text>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
        {images.map(uri => {
          return (
            <Image
              key={uri}
              resizeMode={'cover'}
              style={{
                width: '47%',
                height: 200,
                margin: 5,
              }}
              source={{
                uri,
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
export default SearchResultDetail;
