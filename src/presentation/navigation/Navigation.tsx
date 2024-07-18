import React from 'react';
import {s} from 'react-native-wind';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import signup from '../screens/Signup';
import signin from '../screens/Signin';
import home from '../screens/Home';
import settings from '../screens/Settings';
import leaderboard from '../screens/Leaderboard';
import {View} from 'react-native';

const nativeStack = createNativeStackNavigator();
const tab = createBottomTabNavigator();

const AuthStack = () => (
  <nativeStack.Navigator screenOptions={{headerShown: false}}>
    <nativeStack.Screen name="SignUp" component={signup} />
    <nativeStack.Screen name="SignIn" component={signin} />
  </nativeStack.Navigator>
);

const AppTab = () => (
  <tab.Navigator screenOptions={{headerShown: false}}>
    <tab.Screen name="Home" component={home} />
    <tab.Screen name="Settings" component={settings} />
    <tab.Screen name="Leaderboard" component={leaderboard} />
  </tab.Navigator>
);

export default function Navigation() {
  return (
    <View style={s `flex-1`}>
      <NavigationContainer>
        <nativeStack.Navigator screenOptions={{headerShown: false}}>
          <nativeStack.Screen
            name="Auth"
            component={AuthStack}
            options={{headerShown: false}}
          />
          <nativeStack.Screen
            name="App"
            component={AppTab}
            options={{headerShown: false}}
          />
        </nativeStack.Navigator>
      </NavigationContainer>
    </View>
  );
}
