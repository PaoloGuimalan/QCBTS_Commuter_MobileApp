import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Search = () => {
  
    const authdetails = useSelector(state => state.authdetails)

    return (
     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Search</Text>
     </View>
    )
}

export default Search