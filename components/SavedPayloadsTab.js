import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View, TouchableOpacity} from 'react-native';
import colors from '../lib/colors';
import Badge from './Badge';
import BadgeMini from './BadgeMini';

const SavedPayloadsTab = () => {
  const [payloads, setPayloads] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    getSavedPayloads();
  }, []);

  const getSavedPayloads = async () => {
    try {
      const data = await AsyncStorage.getItem('payloads');
      if (data) {
        setPayloads(JSON.parse(data));
      }
    } catch (e) {
      console.log('failed to get keys');
    }
  };

  const removeSelectedPayload = async index => {
    // if this item id exists in the async storage, remove it
    try {
      let saved = await AsyncStorage.getItem('payloads');
      const savedPayloads = JSON.parse(saved);
      const filtered = savedPayloads.filter((payload, x) => {
        return x !== index;
      });
      await AsyncStorage.setItem('payloads', JSON.stringify(filtered));
      getSavedPayloads();
    } catch (ev) {
      console.log('Error removing payload from async storage', ev);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getSavedPayloads);
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scene}>
      {payloads && payloads.length
        ? payloads.map((search, payloadIndex) => {
            const key = JSON.stringify(search);
            const {
              searchTerm,
              location,
              ownerType,
              category,
              minPrice,
              maxPrice,
            } = search;
            return (
              <TouchableOpacity
                activeOpacity={0.75}
                onLongPress={() => removeSelectedPayload(payloadIndex)}
                onPress={() => {
                  navigation.navigate('Search', {
                    screen: 'Search',
                    params: {...search, void: true},
                  });
                }}
                key={key}
                style={styles.root}>
                <Badge size={20} text={searchTerm} />
                <View style={styles.row}>
                  {category ? (
                    <BadgeMini
                      containerStyles={styles.mini}
                      text={category === 'all' ? 'All Categories' : category}
                    />
                  ) : null}
                  {ownerType ? (
                    <BadgeMini
                      containerStyles={styles.mini}
                      text={ownerType === 'All' ? ownerType : `By ${ownerType}`}
                    />
                  ) : null}
                  {location ? (
                    <BadgeMini containerStyles={styles.mini} text={location} />
                  ) : null}

                  {minPrice && maxPrice ? (
                    <BadgeMini
                      containerStyles={styles.mini}
                      text={`$${minPrice} - $${maxPrice}`}
                    />
                  ) : null}
                  {minPrice && !maxPrice ? (
                    <BadgeMini
                      containerStyles={styles.mini}
                      text={`min ${minPrice}`}
                    />
                  ) : null}
                  {maxPrice && !minPrice ? (
                    <BadgeMini
                      containerStyles={styles.mini}
                      text={`max ${maxPrice}`}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })
        : null}
    </ScrollView>
  );
};

const styles = {
  root: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.grey,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  text: {
    color: 'black',
  },
  mini: {
    marginRight: 5,
  },
  scene: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
};

export default SavedPayloadsTab;
