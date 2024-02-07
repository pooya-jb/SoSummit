import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  Linking,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function PostAlertScreen() {
  const phoneNumber = useSelector(
    (state: RootState) => state.location.phoneNumber
  );

  return (
    <View style={styles.container}>
      <Text style={styles.logo}><Text style={styles.red}>SoS</Text>ummit</Text>
      <Text style={styles.text}>
        Your location has been sent to ski patrol. Help is on the way.
      </Text>
      <Text style={styles.text}>Push red button to call:</Text>
      <Pressable style={styles.phoneNumberContainer}>
        <Text
          onPress={() => {
            Linking.openURL(`tel:${phoneNumber}`);
          }}
          style={styles.phoneNumber}
        >
          SKI PATROL
        </Text>
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
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    fontSize: 40,
    fontFamily: "RussoOne-Regular",
    position: 'absolute',
    top: -100
  },
  phoneNumberContainer: {
    borderRadius: 25,
    backgroundColor: "red",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  phoneNumber: {
    color: "white",
    fontSize: 40,
    margin: 6,
    textAlign: "center",
    padding: 5,
    width: Dimensions.get("window").width * 0.8,
  },
  red: {
    color: "red"
  }
});
