import { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import HelpScreen from '../../screens/HelpScreen';
import PostAlertScreen from '../../screens/PostAlertScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Alert = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [userActiveAlert, setUserActiveAlert] = useState(false);
  const activeAlert = useSelector((state: RootState) => state.user.userActiveAlert);

  return (
    <SafeAreaView style={styles.container}>
      {!activeAlert ?
      <HelpScreen isPressed={isPressed} setIsPressed={setIsPressed} countdown={countdown} setCountdown={setCountdown} setUserActiveAlert={setUserActiveAlert} />
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