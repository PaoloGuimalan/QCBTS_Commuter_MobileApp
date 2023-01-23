/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MainMap from './src/components/maincomponents/MainMap';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/components/authcomponents/Login';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import Axios from 'axios'
import Home from './src/components/maincomponents/Home';
import Register from './src/components/authcomponents/Register'
import Loading from './src/components/authcomponents/Loading';
import { URL } from './src/json/urlconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from './src/components/authcomponents/Auth';

const MainStack = createNativeStackNavigator();

const App: () => Node = () => {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar hidden={true} backgroundColor="white" barStyle="dark-content" />
        <MainStack.Navigator>
          <MainStack.Screen name='Auth' component={Auth} options={{headerShown: false}} />
          <MainStack.Screen name='Register' component={Register} options={{headerShown: false, animation: "slide_from_bottom"}} />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
