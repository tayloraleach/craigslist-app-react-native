import * as React from 'react';
import {View, Dimensions, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {TabBar} from 'react-native-tab-view';
import colors from '../lib/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SavedListingsTab from '../components/SavedListingsTab';
import SavedPayloadsTab from '../components/SavedPayloadsTab';

const initialLayout = {width: Dimensions.get('window').width};

function SavedSearchesScreen({navigation}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'searches', title: 'Searches'},
    {key: 'listings', title: 'Listings'},
  ]);

  const renderScene = SceneMap({
    searches: SavedPayloadsTab,
    listings: SavedListingsTab,
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

export default SavedSearchesScreen;
