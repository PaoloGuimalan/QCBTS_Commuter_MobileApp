import { View, Text } from 'react-native'
import React from 'react'

const FeedInfo = ({navigation, route}) => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>FeedInfo: {route.params.feedID}</Text>
    </View>
  )
}

export default FeedInfo