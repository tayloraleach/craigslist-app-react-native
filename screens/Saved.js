import * as React from 'react';
import {View, Dimensions, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {TabBar} from 'react-native-tab-view';
import colors from '../lib/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchResultItem from '../components/SearchResultItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const SavedListingsTab = () => {
  const [listings, setListings] = React.useState(false);
  const navigation = useNavigation();

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

const SecondRoute = () => (
  <View style={styles.scene}>
    <Text>Searches</Text>
  </View>
);

const initialLayout = {width: Dimensions.get('window').width};

function SavedSearchesScreen({navigation}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'listings', title: 'Listings'},
    {key: 'searches', title: 'Searches'},
  ]);

  const renderScene = SceneMap({
    listings: SavedListingsTab,
    searches: SecondRoute,
  });

  return (
    <TabView
      renderTabBar={props => {
        return (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: colors.purple}}
            indicatorContainerStyle={{backgroundColor: 'white'}}
            renderLabel={({route}) => {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold', marginRight: 5}}>
                    {route.title}
                  </Text>
                  {route.title === 'Listings' ? (
                    <Icon name="list" size={20} />
                  ) : (
                    <Icon name="search" size={20} />
                  )}
                </View>
              );
            }}
            activeColor={colors.purple}
            inactiveColor={colors.grey}
          />
        );
      }}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = {
  scene: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
};

export default SavedSearchesScreen;
