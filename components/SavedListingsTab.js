import * as React from 'react';
import SearchResultItem from '../components/SearchResultItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const SavedListingsTab = () => {
  const [listings, setListings] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    getSavedListings();
  }, []);

  const getSavedListings = async () => {
    try {
      const data = await AsyncStorage.getItem('listings');
      if (data) {
        setListings(JSON.parse(data));
      }
    } catch (e) {
      console.log('failed to get keys');
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getSavedListings);
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scene}>
      {listings && listings.length
        ? listings.map(listing => {
            const {id} = listing;
            return (
              <SearchResultItem
                key={id}
                item={{...listing}}
                onLongPressCallback={getSavedListings}
              />
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

export default SavedListingsTab;
