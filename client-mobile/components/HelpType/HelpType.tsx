import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from './HelpType.styles';

export default function HelpType () {
  const [helpType, setHelpType] = useState('');

  useEffect(() => {
    setHelpType('')
  }, [])

  function handlePress (helpTypeValue: string) {
    setHelpType(helpTypeValue);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          helpType === "Medical" && styles.selectedButton,
        ]}
        onPress={() => handlePress("Medical")}
      >
        <Text style={styles.text}>Medical Emergency</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[
          styles.button,
          helpType === "Lost" && styles.selectedButton,
        ]}
        onPress={() => handlePress("Lost")}>
        <Text style={styles.text}>I'm Lost</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[
          styles.button,
          helpType === "Other" && styles.selectedButton,
        ]}
        onPress={() => handlePress("Other")}>
        <Text style={styles.text}>Other</Text>
      </TouchableOpacity>
    </View>
  )
}