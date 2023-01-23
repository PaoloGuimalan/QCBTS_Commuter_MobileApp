import { View, Text, Image } from 'react-native'
import React from 'react'
import samplerecimg from '../../resources/sampleRecommend.png'
import OctiIcons from 'react-native-vector-icons/Octicons'
import IonIcons from 'react-native-vector-icons/Ionicons'

const FeedIndvUpdate = () => {
  return (
    <View style={{backgroundColor: "white", width: "100%", height: 150, elevation: 0, borderColor: "#E2E5DE", borderWidth: 1, borderRadius: 10, flexDirection: "row"}}>
      <View style={{backgroundColor: "transparent", height: "100%", width: 135, justifyContent: "center", alignItems: "center"}}>
        <Image source={samplerecimg} style={{width: "100%", height: "100%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
      </View>
      <View style={{backgroundColor: "transparent", flex: 1, flexDirection: "column", paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
        <Text style={{color: "black", fontSize: 15, fontWeight: "bold"}}>For Today's Traffic</Text>
        <Text style={{color: "#767676", fontSize: 13, marginBottom: 5}}>January 2023</Text>
        <Text style={{color: "#444444", fontSize: 13}} numberOfLines={4}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
        <View style={{marginTop: 5, flexDirection: "row", width: "100%", backgroundColor: "transparent"}}>
            <Text style={{backgroundColor: "#F85858", color: "white", paddingLeft: 5, paddingRight: 5, height: 20, minWidth: 50, textAlign: "center", textAlignVertical: "center", borderRadius: 10, fontSize: 12}}>Latest</Text>
            <View style={{width: "100%", flexDirection: "row", alignItems: "center", marginLeft: 10}}>
                <IonIcons name='time-outline' style={{fontSize: 15, color: "#404040"}} />
                <Text style={{color: "#404040", fontSize: 12, width: "100%", textAlign: "justify", marginLeft: 3}}>6 days ago</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

export default FeedIndvUpdate