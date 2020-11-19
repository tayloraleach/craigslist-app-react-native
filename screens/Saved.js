import * as React from 'react';
import {View, Dimensions, Text, TouchableOpacity} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {TabBar} from 'react-native-tab-view';
import colors from '../lib/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchResultItem from '../components/SearchResultItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';

const FirstRoute = () => {
  const [listings, setListings] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        console.log('fetstoedimtes');
        const data = await AsyncStorage.getItem('listings');
        if (data) {
          setListings(JSON.parse(data));
        }
      } catch (e) {
        console.log('failed to get keys');
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.scene}>
      {listings && listings.length ? (
        listings.map(listing => {
          const {id} = listing;
          return (
            <View style={{position: 'relative'}}>
              <View style={{marginRight: 30}}>
                <SearchResultItem key={id} item={{...listing}} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  alert('ass');
                }}
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  right: 0,
                  width: 30,
                  height: '100%',
                  bottom: 10,
                }}>
                <Icon name="cancel" size={24} color={'#ef0000'} />
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Loader />
      )}
    </View>
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
    listings: FirstRoute,
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
