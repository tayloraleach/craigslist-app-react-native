import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View, TouchableOpacity} from 'react-native';
import colors from '../lib/colors';
import Badge from './Badge';

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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getSavedPayloads);
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scene}>
      {payloads && payloads.length
        ? payloads.map(search => {
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
                onPress={() => {
                  console.log(search);
                }}
                key={key}
                style={{
                  marginBottom: 5,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: colors.grey,
                }}>
                <Badge size={20} text={searchTerm} />
                <Text>{category}</Text>
                <Text>{minPrice}</Text>
                <Text>{maxPrice}</Text>
                <Text>{location}</Text>
                <Text>{ownerType}</Text>
              </TouchableOpacity>
            );
          })
        : null}
    </ScrollView>
  );
};

const styles = {
  scene: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
};

export default SavedPayloadsTab;
