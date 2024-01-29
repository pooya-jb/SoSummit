import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import HelpButton from "./HelpButton/HelpButton";
import HelpType from "./HelpType/HelpType";

export default function HelpScreen ({isPressed, setIsPressed, countdown, setCountdown, setShowMessage}) {
  return (
    <>
      <Text style={styles.questionOne}>What kind of help do you need?</Text>
      <Text style={styles.questionTwo}>Select an option and hold SOS button</Text>
      <HelpType />
      <HelpButton isPressed={isPressed} setIsPressed={setIsPressed} countdown={countdown} setCountdown={setCountdown} setShowMessage={setShowMessage}/>
    </>
  )
}

const styles = StyleSheet.create({

  questionOne: {
    fontSize: 20,
    fontWeight: '800',
    position: 'absolute',
    top: 130
  },
  questionTwo: {
    fontSize: 16,
    fontWeight: '500',
    position: 'absolute',
    top: 160
  }
})