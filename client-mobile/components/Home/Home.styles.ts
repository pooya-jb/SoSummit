import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#607ca4',
    borderRadius: 50,
    elevation: 10,
    height: 100,
    justifyContent: 'center',
    margin: 10,
    padding: 5,
    shadowColor: 'black',
    shadowOffset: {
      height: 10,
      width: 15,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
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
    fontFamily: 'Poppins-Regular'
  },
  currentLocationBtnContainer: {
    backgroundColor: 'rgba(214, 211, 191, 0.6)',
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