import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import Signup from '../screens/auth/Signup.screens';
import Signin from '../screens/auth/Signin.screens';
import Home from '../screens/app/Home.screens';
import Settings from '../screens/app/Settings.screens';
import Leaderboard from '../screens/app/Leaderboard.screens';

// Custom Components
import CustomBottomNavBar from '../components/CustomNavBar.components';
import GenerateLine from '../screens/app/GenerateLine.screens';

const NativeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <NativeStack.Navigator screenOptions={{headerShown: false}}>
    <NativeStack.Screen name="SignUp" component={Signup} />
    <NativeStack.Screen name="SignIn" component={Signin} />
  </NativeStack.Navigator>
);

const HomeStack = () => (
  <NativeStack.Navigator screenOptions={{headerShown: false}}>
    <NativeStack.Screen name="Home" component={Home} />
    <NativeStack.Screen name="GenerateLine" component={GenerateLine} />
  </NativeStack.Navigator>
);

const AppTab = () => (
  <Tab.Navigator
    tabBar={props => <CustomBottomNavBar {...props} />}
    screenOptions={{headerShown: false}}>
    <Tab.Screen name="HomeScreen" component={HomeStack} />
    <Tab.Screen name="Leaderboard" component={Leaderboard} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

export default function Navigation() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator screenOptions={{headerShown: false}}>
        <NativeStack.Screen
          name="App"
          component={AppTab}
          options={{headerShown: false}}
        />
        <NativeStack.Screen
          name="Auth"
          component={AuthStack}
          options={{headerShown: false}}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}
