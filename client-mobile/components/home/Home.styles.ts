import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#10B2C1',
    borderColor: 'gray',
    borderRadius: 50,
    borderWidth: 1,
    elevation: 10,
    height: 100,
    justifyContent: 'center',
    margin: 10,
    padding: 5,
    shadowColor: 'gray',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 15,
    width: 100,
  },
  buttonContainer: {
    alignSelf: 'center',
    bottom: 60,
    position: 'absolute',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  currentLocationBtnContainer: {
    backgroundColor: '#D6D3BF',
    borderRadius: 50,
    borderWidth: 0.5,
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 5,
    position: 'absolute',
    right: 10,
    textAlign: 'center',
    top: 20,
  },
  home: {
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  mapContainer: {
    borderColor: 'black',
    height: '100%',
    width: '100%',
  },
});
