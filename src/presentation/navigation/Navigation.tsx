import React from 'react';
import {s} from 'react-native-wind';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import Signup from '../screens/Signup.screens';
import Signin from '../screens/Signin.screens';
import Home from '../screens/Home.screens';
import Settings from '../screens/Settings.screens';
import Leaderboard from '../screens/Leaderboard.screens';
import {View, Platform} from 'react-native';

const nativeStack = createNativeStackNavigator();
const tab = createBottomTabNavigator();

const AuthStack = () => (
  <nativeStack.Navigator screenOptions={{headerShown: false}}>
    <nativeStack.Screen name="SignUp" component={Signup} />
    <nativeStack.Screen name="SignIn" component={Signin} />
  </nativeStack.Navigator>
);

const AppTab = () => (
  <tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName: string = 'help-outline';

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        } else if (route.name === 'Leaderboard') {
          iconName = focused ? 'trophy' : 'trophy-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarStyle:
        Platform.OS === 'android'
          ? {
              paddingBottom: 5,
              height: 60,
            }
          : {},
      tabBarLabelStyle:
        Platform.OS === 'android'
          ? {
              marginTop: -5,
              fontSize: 12,
            }
          : {},
    })}>
    <tab.Screen name="Home" component={Home} />
    <tab.Screen name="Settings" component={Settings} />
    <tab.Screen name="Leaderboard" component={Leaderboard} />
  </tab.Navigator>
);

export default function Navigation() {
  return (
    <View style={s`flex-1`}>
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
