import React from "react";
import { Text, Image, View, ScrollView, StyleSheet, Dimensions } from "react-native";

export default function App( ) {
  return (
    <View style = { stylesheet.styleHomePage }>
    <Image style={ stylesheet.style201509MeHiveLaunch1 } source= {{ uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/kxeTzWcRfJO1mBWQKtCyAUBZ.png" }} >
    </Image>
  </View>
  )
}

const stylesheet = StyleSheet.create({
  style201509MehiveLaunch1: {
    position: "absolute",
    left: 0,
    top: 145,
    borderRadius: null,
    width: 360,
    height: 325,
  },
  style_Home_Page: {
    position:"absolute",
    width: 360,
    height: 592,
    left: 0,
    top: 0,
  },

  styleStylename: {
    position: "relative",
    width: Dimensions.get("window").width,
    height: 592,
    backgroundColor: "rgba(241, 242, 243, 1)",
  },
});