import { View, Pressable, Text, StyleSheet, Alert } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import { loggedOut } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function User() {
  const dispatch = useDispatch();
  const isPresented = router.canGoBack();
  const onTrip = useSelector((state: RootState) => state.user.tripStarted);

  const handleLogout = () => {
    if (onTrip === true) {
      Alert.alert("Error", "Please end your trip before logging out", [
        {
          text: "Okay",
          style: "cancel",
        },
      ]);
    } else {
      AsyncStorage.removeItem("AccessToken");
      dispatch(loggedOut());
      router.navigate("../");
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!isPresented && <Link href="../"></Link>}
      <StatusBar style="light" />
      <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#51688a" : "#607ca4" },
      ]}
      onPress={handleLogout}
    >
      <Text style={styles.buttonText}>Log out</Text>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: 'white'
  },
  button: {
    margin: 20,
    padding: 12,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
