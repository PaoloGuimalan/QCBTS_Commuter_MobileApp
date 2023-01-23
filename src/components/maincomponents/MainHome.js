import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Home'
import Profile from './Profile'

const BodyStack = createNativeStackNavigator()

const MainHome = ({navigation}) => {
  return (
    <BodyStack.Navigator>
        <BodyStack.Screen name='HomeFeed' component={Home} options={{headerShown: false, animation: "slide_from_right"}} />
        <BodyStack.Screen name='Profile' component={Profile} options={{headerShown: false, animation: "slide_from_bottom"}} />
    </BodyStack.Navigator>
  )
}

export default MainHome