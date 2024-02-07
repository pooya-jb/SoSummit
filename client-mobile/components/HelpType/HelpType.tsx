import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

import { styles } from "./HelpType.styles";

export default function HelpType({ helpType, setHelpType }) {
  const tallPhone = Dimensions.get("window").height >= 844;

  useEffect(() => {
    setHelpType("");
  }, []);

  function handlePress(helpTypeValue: string) {
    setHelpType(helpTypeValue);
  }

  return (
    <View style={[styles.container, { marginBottom: tallPhone ? 90 : 20 }]}>
      <TouchableOpacity
        style={[styles.button, helpType === "Medical" && styles.selectedButton]}
        onPress={() => handlePress("Medical")}
      >
        <Text style={styles.text}>Medical Emergency</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, helpType === "Lost" && styles.selectedButton]}
        onPress={() => handlePress("Lost")}
      >
        <Text style={styles.text}>I'm Lost</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, helpType === "Other" && styles.selectedButton]}
        onPress={() => handlePress("Other")}
      >
        <Text style={styles.text}>Other</Text>
      </TouchableOpacity>
    </View>
  );
}
