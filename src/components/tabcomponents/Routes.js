import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Routes = () => {
  
    const authdetails = useSelector(state => state.authdetails)

    return (
     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Routes</Text>
     </View>
    )
}

export default Routes