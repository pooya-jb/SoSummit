import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    marginBottom:-25,
    marginTop:10,
    width: 150,
    height: 150,
    borderRadius: 90,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#c4020c',
    opacity: 1,
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: '800',
  },
});