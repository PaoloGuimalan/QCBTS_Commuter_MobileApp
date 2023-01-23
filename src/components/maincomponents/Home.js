import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import IonIcons from 'react-native-vector-icons/Ionicons'
import FA5 from 'react-native-vector-icons/FontAwesome5'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feed from '../tabcomponents/Feed'
import Search from '../tabcomponents/Search'
import Map from '../tabcomponents/Map'
import Routes from '../tabcomponents/Routes'

const TabStack = createNativeStackNavigator()

const Home = ({navigation}) => {

  const authdetails = useSelector(state => state.authdetails)
  const [currentTab, setcurrentTab] = useState("Feed");

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <View style={{width: "100%", height: "100%"}}>
        <TabStack.Navigator initialRouteName='Feed'>
          <TabStack.Screen name='Feed' component={Feed} options={{headerShown: false, animation: "slide_from_right"}} />
          <TabStack.Screen name='Search' component={Search} options={{headerShown: false, animation: "slide_from_right"}} />
          <TabStack.Screen name='Map' component={Map} options={{headerShown: false, animation: "slide_from_right"}} />
          <TabStack.Screen name='Routes' component={Routes} options={{headerShown: false, animation: "slide_from_right"}} />
        </TabStack.Navigator>
      </View>
      <View style={{backgroundColor: "white", width: "95%", maxWidth: 350, position: "absolute", bottom: 20, height: 65, borderRadius: 20, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", elevation: 2}}>
        <TouchableOpacity onPress={() => { setcurrentTab("Feed"); navigation.navigate("Feed") }} style={{backgroundColor: "transparent", width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
          <IonIcons name='md-home' style={{color: currentTab == "Feed"? "#2B4273" : "black", fontSize: 30}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setcurrentTab("Search"); navigation.navigate("Search") }} style={{backgroundColor: "transparent", width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
          <IonIcons name='search' style={{color: currentTab == "Search"? "#2B4273" : "black", fontSize: 30}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setcurrentTab("Map"); navigation.navigate("Map") }} style={{backgroundColor: "transparent", width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
          <IonIcons name='map' style={{color: currentTab == "Map"? "#2B4273" : "black", fontSize: 30}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setcurrentTab("Routes"); navigation.navigate("Routes") }} style={{backgroundColor: "transparent", width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
          <FA5 name='route' style={{color: currentTab == "Routes"? "#2B4273" : "black", fontSize: 30}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home