import { AppRegistry } from 'react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen'; 
import DetailScreen from './screens/DetailScreen'; 
import ComicBookViewer from './screens/ComicBookViewer';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ComicBookViewer" component={ComicBookViewer} options={{ headerShown: true }} />

  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);
