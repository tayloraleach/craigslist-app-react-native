import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import SavedSearchesScreen from '../screens/Saved';
import colors from '../lib/colors';
import SearchResultsScreen from '../screens/SearchResults';
import SearchResultDetail from '../screens/SearchResultDetail';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: colors.purple,
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
  ...TransitionPresets.SlideFromRightIOS,
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        options={{title: 'Search Craigslist'}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="SearchResults"
        options={({route}) => ({title: route.params.searchTerm})}
        component={SearchResultsScreen}
      />
      <Stack.Screen
        name="SearchResultDetail"
        options={({route}) => ({title: route.params.title})}
        component={SearchResultDetail}
      />
    </Stack.Navigator>
  );
};

const SavedSearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="SavedSearches"
        options={{title: 'Saved Searches'}}
        component={SavedSearchesScreen}
      />
    </Stack.Navigator>
  );
};

export {MainStackNavigator, SavedSearchStackNavigator};
