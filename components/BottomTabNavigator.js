import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackNavigator, SavedSearchStackNavigator} from './StackNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../lib/colors';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.purple,
        inactiveTintColor: colors.grey,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Saved') {
            iconName = focused ? 'favorite' : 'favorite';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Saved" component={SavedSearchStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
