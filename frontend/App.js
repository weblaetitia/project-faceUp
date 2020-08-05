import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

// redux
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import photos from "./reducers/photos";
const store = createStore(combineReducers({ photos }));

console.disableYellowBox = true;

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

// import my Components
import HomeScreen from './screens/HomeScreen'
import GalleryScreen from './screens/GalleryScreen'
import SnapScreen from './screens/SnapScreen'

// icons
import { Ionicons } from '@expo/vector-icons'; 


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Gallery" component={BottomTabNav} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  );
}

function BottomTabNav() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#009788',
      inactiveTintColor: '#FFFFFF',
      activeBackgroundColor: '#111224',
      inactiveBackgroundColor: '#111224',
      safeAreaInset: { bottom: 'never', top: 'never' } ,
      style: {
        backgroundColor: '#111224'
      }
    }}>
      <Tab.Screen name="Gallery" component={GalleryScreen} options={{
          tabBarLabel: 'Gallery',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-photos" size={32} color={color} />
          ),
        }}/>
      <Tab.Screen name="Snap" component={SnapScreen} options={{
          tabBarLabel: 'Snap',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-camera" size={32} color={color} />
          ),
        }}/>
    </Tab.Navigator>
  );
}
