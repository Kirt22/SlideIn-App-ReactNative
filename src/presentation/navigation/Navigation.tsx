import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';

// Screens
import Signup from '../screens/Signup.screens';
import Signin from '../screens/Signin.screens';
import Home from '../screens/Home.screens';
import Settings from '../screens/Settings.screens';
import Leaderboard from '../screens/Leaderboard.screens';

// Custom Components
import CustomBottomNavBar from '../components/CustomNavBar.components';

const NativeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <NativeStack.Navigator screenOptions={{ headerShown: false }}>
    <NativeStack.Screen name="SignUp" component={Signup} />
    <NativeStack.Screen name="SignIn" component={Signin} />
  </NativeStack.Navigator>
);

const AppTab = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomBottomNavBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Leaderboard" component={Leaderboard} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

export default function Navigation() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <NativeStack.Navigator screenOptions={{ headerShown: false }}>
          <NativeStack.Screen
            name="App"
            component={AppTab}
            options={{ headerShown: false }}
          />
          <NativeStack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        </NativeStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
