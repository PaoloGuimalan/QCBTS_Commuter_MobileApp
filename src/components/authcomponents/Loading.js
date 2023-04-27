import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import carimg from '../../resources/Car.png'
import citylayout from '../../resources/citylayout.png'

const Loading = () => {
  return (
    <ImageBackground source={citylayout} style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Image resizeMode='contain' source={carimg} style={styles.carimgstyle} />
      <Text style={{color: "white", fontWeight: "bold", fontSize: 25}}>Bus Track</Text>
      <Text style={{color: "#d9d9d9", fontWeight: "normal", fontSize: 13}}>KASAMA KA SA PAG-UNLAD</Text>
      <Text style={{color: "#d9d9d9", position: "absolute", bottom: 100, fontSize: 13}}>loading...</Text>
      <Text style={{color: "#d9d9d9", position: "absolute", bottom: 30, fontWeight: "normal", fontSize: 10}}>dedicated to QUEZON CITY QCITY BUS SERVICE</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  carimgstyle:{
    zIndex: 1,
    width: 170,
    height: 170,
    marginBottom: 5
  }
})

export default Loading