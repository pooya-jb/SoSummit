import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderWidth: 1.5,
    width: '80%',
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 15,
    gap: 16,
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
});