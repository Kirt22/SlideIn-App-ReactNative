import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens 
import signup from './screens/Signup';
import signin from './screens/Signin';
import home from './screens/Home';
import settings from './screens/Settings';
import leaderboard from './screens/Leaderboard';
import generateLine from './screens/GenerateLine';

const nativeStack = createNativeStackNavigator();
const tab = createBottomTabNavigator();

const AuthStack = () => (
  <nativeStack.Navigator>
    <nativeStack.Screen name="SignUp" component={signup} />
    <nativeStack.Screen name="SignIn" component={signin} />
  </nativeStack.Navigator>
);

const AppTab = () => (
  <tab.Navigator>
    <tab.Screen name="Home" component={home} />
    <tab.Screen name="Settings" component={settings} />
    <tab.Screen name="Leaderboard" component={leaderboard} />
  </tab.Navigator>
);


const App = () => {
  return (
    <NavigationContainer> 
      <nativeStack.Navigator> 
        <nativeStack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        <nativeStack.Screen name="App" component={AppTab} options={{ headerShown: false }} />
      </nativeStack.Navigator>
    </NavigationContainer>
  )
}

export default App