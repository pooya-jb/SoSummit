import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    top: '-15%',
    gap: 16,
  },
  button: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderWidth: 1.5,
    width: '80%',
  },
  selectedButton: {
    backgroundColor: "#d2d2d2"
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  }
})