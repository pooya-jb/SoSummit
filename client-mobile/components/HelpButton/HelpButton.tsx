import React, { useRef, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
// import { Audio } from 'expo-av';
import * as Animatable from 'react-native-animatable';
import * as Location from 'expo-location';

import { styles } from './HelpButton.styles';
import { ButtonProps } from '../../utils/types';
import socket, {checkResponse} from '../../utils/socket';

const COUNTDOWN_UNIT = 1000;

const HelpButton: React.FC<ButtonProps> = ({
  countdown,
  setCountdown,
  isPressed,
  setIsPressed,
  setShowMessage,
  helpType
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const location = useSelector((state: RootState) => state.user.location);
  const userLocation = useSelector((state: RootState) => state.user.userLocation);
  const username = useSelector((state: RootState) => state.user.username);
  const userCoords = [userLocation.latitude, userLocation.longitude]
  // const [soundInstance, setSoundInstance] = useState<Audio.Sound | undefined>(undefined);

  useEffect(() => {
    if (isPressed) {
      intervalRef.current = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 1) {
            return prevCountdown - 1;
          } else {
            setIsPressed(false);
            triggerAlert(location);
            setShowMessage(true);
            clearInterval(intervalRef.current!);
            return 0;
          }
        });
      }, COUNTDOWN_UNIT);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPressed]);


  async function triggerAlert(location) {
    try {
      console.log('line 67', location)
      const {coords} = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          timeInterval: 5000,
          distanceInterval: 0
        })
        const {latitude, longitude} = coords
        console.log('line 74', location)
        socket
        .timeout(5000)
        .emit(`Location-${location}-alert`, {location, userCoords : [latitude, longitude], helpType, username}, checkResponse());
    } catch (err) {
      console.error(err)
    }
  }

  async function handlePress() {
    setIsPressed(true);
    setCountdown(3);
    // const { sound } = await Audio.Sound.createAsync(require('../../assets/siren.mp3'));
    // setSoundInstance(sound);
    // await sound.playAsync();
  }

  function handleUnPress() {
    setIsPressed(false);
    setCountdown(0);
    // if (soundInstance) {
    //   soundInstance.stopAsync();
    //   soundInstance.unloadAsync();
    // }
  }

  const PulseAnimatable = Animatable.createAnimatableComponent(View);

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, isPressed && styles.buttonPressed]}
        onPressIn={handlePress}
        onPressOut={handleUnPress}
      >
        <PulseAnimatable
          animation={isPressed ? 'pulse' : undefined}
          iterationCount="infinite"
          style={isPressed ? styles.pulsePressed : styles.pulse}
        >
          <Text style={styles.text}>{countdown === 0 ? 'SOS' : countdown}</Text>
        </PulseAnimatable>
      </TouchableOpacity>
    </View>
  );
}

export default HelpButton;