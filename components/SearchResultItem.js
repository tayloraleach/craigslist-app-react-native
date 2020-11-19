import * as React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import colors from '../lib/colors';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment-mini';
import Badge from './Badge';

function SearchResultItem({item}) {
  const {title, price, datePosted, hood, images} = item;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SearchResultDetail', item)}
      activeOpacity={0.75}
      style={styles.root}>
      {images[0] && (
        <Image
          resizeMode={'cover'}
          style={styles.image}
          source={{
            uri: images[0],
          }}
        />
      )}
      <View style={styles.container}>
        <Text>
          {title} {hood ? '- ' : ''}
        </Text>
        <View style={styles.metaContainer}>
          {hood ? <Text style={styles.metaText}>({hood}) - </Text> : null}
          <Text style={styles.metaText}>{moment(datePosted).fromNow()}</Text>
        </View>
        <View style={styles.costContainer}>
          <Badge text={price} size={12} containerStyles={styles.badgeStyles} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
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
};

export default SearchResultItem;
