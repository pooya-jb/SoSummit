import { Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import HelpButton from '../components/HelpButton/HelpButton';
import HelpType from '../components/HelpType/HelpType';
import { ButtonProps } from '../utils/types';
import { RootState } from '../redux/store';

const HelpScreen: React.FC<ButtonProps> = ({
  isPressed,
  setIsPressed,
  countdown,
  setCountdown,
  setShowMessage,
}) => {
  const location = useSelector((state: RootState) => state.user.location);

  return (
    <>
      <Text style={styles.questionOne}>What kind of help do you need?</Text>
      <Text style={styles.questionTwo}>
        Select an option and hold SOS button
      </Text>
      <HelpType />
      <HelpButton
        isPressed={isPressed}
        setIsPressed={setIsPressed}
        countdown={countdown}
        setCountdown={setCountdown}
        setShowMessage={setShowMessage}
      />
    </>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  questionOne: {
    fontSize: 20,
    fontWeight: '800',
    position: 'absolute',
    top: 130,
  },
  questionTwo: {
    fontSize: 16,
    fontWeight: '500',
    position: 'absolute',
    top: 160,
  },
});
