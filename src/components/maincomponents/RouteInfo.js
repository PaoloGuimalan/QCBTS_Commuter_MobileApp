import { View, Text } from 'react-native'
import React from 'react'

const RouteInfo = ({route, navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>RouteInfo: {route.params.id}</Text>
    </View>
  )
}

export default RouteInfo