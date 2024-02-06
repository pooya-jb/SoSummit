import { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Pressable, Linking } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function PostAlertScreen() {
  const phoneNumber = useSelector((state: RootState) => state.location.phoneNumber);
  useEffect(() => {
    Alert.alert(
      "Help is on the way",
      "Your request has been received. Please call us if you have more information to share.",
      [
        {
          text: "Okay",
          style: "default",
        },
      ]
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>Push below to call:</Text>
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
