import { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Pressable, Linking } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function PostAlertScreen() {
  const phoneNumber = useSelector((state: RootState) => state.location.phoneNumber);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Push below to call:</Text>
      <Pressable >
        <Text onPress={()=>{Linking.openURL(`tel:${phoneNumber}`);}} style={styles.phoneNumber}>📞SKI PATROL📞</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold'
  },
  phoneNumber: {
    color: 'white',
    fontSize: 40,
    textAlign: "center",
    padding: 5,
    width: "100%",
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 4
  }
});
