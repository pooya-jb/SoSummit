import { useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import HelpScreen from '../../screens/HelpScreen';
import PostAlertScreen from '../../screens/PostAlertScreen';

const Alert = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {!showMessage ?
      <HelpScreen isPressed={isPressed} setIsPressed={setIsPressed} countdown={countdown} setCountdown={setCountdown} setShowMessage={setShowMessage} />
      :
      <PostAlertScreen />}
    </SafeAreaView>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 65
  },
})