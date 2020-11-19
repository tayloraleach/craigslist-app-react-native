import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import SavedSearchesScreen from '../screens/Saved';
import colors from '../lib/colors';
import SearchResultDetail from '../screens/SearchResultDetail';
import {Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const handleOpenURL = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Search"
        options={{
          title: 'Craigslist: For Sale',
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="SearchResultDetail"
        options={({route}) => {
          return {
            headerRight: () => (
              <Icon
                style={{marginRight: 15}}
                onPress={() => handleOpenURL(route.params.url)}
                name="launch"
                color="#fff"
                size={22}
              />
            ),
            title: route.params.url,
          };
        }}
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
        options={{title: 'Saved'}}
        component={SavedSearchesScreen}
      />
    </Stack.Navigator>
  );
};

export {MainStackNavigator, SavedSearchStackNavigator};
