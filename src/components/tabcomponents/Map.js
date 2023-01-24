import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MainMap from '../maincomponents/MainMap'

const Map = () => {
  
    const authdetails = useSelector(state => state.authdetails)

    return (
     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        {/* <Text>Map</Text> */}
        <MainMap />
     </View>
    )
}

export default Map