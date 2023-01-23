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
import Loading from './src/components/authcomponents/Loading';
import { URL } from './src/json/urlconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainStack = createNativeStackNavigator();

const App: () => Node = () => {

  const [authdetails, setauthdetails] = useState({
      auth: null,
      userID: null,
      username: ""
  })

  useEffect(() => {
    authConnection()
  },[])

  const authConnection = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      if(resp == null){
        setauthdetails({
            auth: false,
            userID: null,
            username: ""
        })
      }
      else{
        Axios.get(`${URL}/auth/commuter/jwtchecker`, {
          headers:{
            "x-access-token": resp
          }
        }).then((response) => {
          if(response.data.status){
            setauthdetails({
              auth: true,
              userID: response.data.authdetails.userID,
              username: response.data.authdetails.username
            })
          }
          else{
            setauthdetails({
                auth: false,
                userID: null,
                username: ""
            })
          }
        }).catch((err) => {
          setauthdetails({
              auth: false,
              userID: null,
              username: ""
          })
          console.log(err)
        })
      }
    })
  }
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar hidden={true} backgroundColor="white" barStyle="dark-content" />
        <MainStack.Navigator>
          <MainStack.Screen name='Home' component={authdetails.auth != null? authdetails.auth? Home : Login : Loading} options={{headerShown: false}} />
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
