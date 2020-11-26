import * as React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import colors from '../lib/colors';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment-mini';
import Badge from './Badge';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SearchResultItem({item, onLongPressCallback}) {
  const {title, price, datePosted, hood, images, isOutOfArea} = item;
  const navigation = useNavigation();
  let imageSource = require('../images/placeholder-img.jpg');
  if (images[0]) {
    imageSource = {
      uri: images[0],
    };
  }
  const styleType = 'thumb';
  const styledRoot = {
    ...styles[styleType].root,
    borderWidth: isOutOfArea ? 0 : 1,
  };
  return (
    <TouchableOpacity
      onLongPress={async (e, x) => {
        // if this item id exists in the async storage, remove it
        try {
          let saved = await AsyncStorage.getItem('listings');
          const savedListings = JSON.parse(saved);
          const filtered = savedListings.filter(listing => {
            return listing.id !== item.id;
          });
          await AsyncStorage.setItem('listings', JSON.stringify(filtered));
        } catch (ev) {
          console.log('Error getting listings from async storage', ev);
        }
        onLongPressCallback();
      }}
      onPress={() => navigation.navigate('SearchResultDetail', item)}
      activeOpacity={0.75}
      style={styledRoot}>
      {styleType !== 'textOnly' ? (
        <Image
          resizeMode={'cover'}
          style={styles[styleType].image}
          source={imageSource}
        />
      ) : null}
      <View style={styles[styleType].container}>
        <Text style={styles[styleType].title}>
          {title} {hood ? '- ' : ''}
        </Text>
        <View style={styles[styleType].metaContainer}>
          {hood ? (
            <Text style={styles[styleType].metaText}>({hood}) - </Text>
          ) : null}
          {isOutOfArea ? (
            <Text style={styles[styleType].metaText}>({isOutOfArea}) - </Text>
          ) : null}
          <Text style={styles[styleType].metaText}>
            {moment(datePosted).fromNow()}
          </Text>
        </View>
        <View style={styles[styleType].costContainer}>
          <Badge
            text={price}
            size={12}
            containerStyles={styles[styleType].badgeStyles}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  textOnly: {
    root: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderWidth: 1,
      borderColor: colors.grey,
      flexDirection: 'row',
      borderRadius: 2,
      marginBottom: 10,
    },
    title: {
      color: 'black',
    },
    container: {
      height: '100%',
      width: '100%',
      padding: 5,
      paddingRight: 50,
    },
    metaText: {color: '#bbb', fontSize: 12},
    metaContainer: {flexDirection: 'row'},
    costContainer: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      paddingVertical: 4,
      paddingHorizontal: 6,
      borderTopLeftRadius: 2,
      backgroundColor: colors.purple,
    },
    badgeStyles: {
      paddingVertical: 0,
      paddingHorizontal: 2,
      borderTopLeftRadius: 2,
    },
  },
  bigImage: {},
  thumb: {
    title: {
      color: 'black',
    },
    root: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderWidth: 1,
      borderColor: colors.grey,
      flexDirection: 'row',
      borderRadius: 2,
      marginBottom: 10,
    },
    image: {
      width: 80,
      height: '100%',
      zIndex: 2,
      marginRight: 'auto',
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2,
    },
    container: {
      height: '100%',
      width: '100%',
      paddingLeft: 90,
      paddingRight: 5,
      paddingTop: 5,
      paddingBottom: 30,
    },
    metaText: {color: '#bbb', fontSize: 12},
    metaContainer: {flexDirection: 'row'},
    costContainer: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      paddingVertical: 4,
      paddingHorizontal: 6,
      borderTopLeftRadius: 2,
      backgroundColor: colors.purple,
    },
    badgeStyles: {
      paddingVertical: 0,
      paddingHorizontal: 2,
      borderTopLeftRadius: 2,
    },
  },
};

export default SearchResultItem;
