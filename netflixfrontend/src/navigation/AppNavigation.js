//import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigator from './BottonTabNav';
import MovieDetails from '../screens/MovieDetails';
import MoviesVideoPlayer from '../screens/MoviesVideoPlayer';
import ShowsTabNav from './ShowsTabNav';
import ShowDetails from '../screens/ShowDetails';
import ShowsVideoPlayer from '../screens/ShowsVideoPlayer';
import SplashScreen from '../screens/SplashScreen';
import AddServerScreen from '../screens/AddServerScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {

    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="AddServerScreen" component={AddServerScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
             <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            <Stack.Screen name="ShowsTabNav" component={ShowsTabNav} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
            <Stack.Screen name="ShowDetails" component={ShowDetails} />
            <Stack.Screen name="MoviesVideoPlayer" component={MoviesVideoPlayer} />
            <Stack.Screen name="ShowsVideoPlayer" component={ShowsVideoPlayer} /> 
          </Stack.Navigator>
        </NavigationContainer>)
}