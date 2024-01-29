import { router } from 'expo-router';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import HelpButton from '../../components/HelpButton/HelpButton';
import HelpType from '../../components/HelpType/HelpType';

const Alert = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.questionOne}>What kind of help do you need?</Text>
      <Text style={styles.questionTwo}>Select an option and hold SOS button</Text>
      <HelpType />
      <HelpButton />
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