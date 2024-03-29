import React, { useRef, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import * as Location from 'expo-location';

import { styles } from './HelpButton.styles';
import { HelpButtonProps } from '../../utils/types';
import socket, {checkResponse} from '../../utils/socket';
import { useDispatch } from 'react-redux';
import { setActiveAlert } from '../../redux/userSlice';

const COUNTDOWN_UNIT = 1000;

const HelpButton: React.FC<HelpButtonProps> = ({
  countdown,
  setCountdown,
  isPressed,
  setIsPressed,
  setUserActiveAlert,
  helpType
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const location = useSelector((state: RootState) => state.user.location);
  const userLocation = useSelector((state: RootState) => state.user.userLocation);
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const userCoords = [userLocation.latitude, userLocation.longitude]

  const triggerAlertResponse = (res) => {
    if (res.status) return   Alert.alert(
      'Request received',
      'Ski patrol received your request and help is on the way',
      [
        {
          text: "Okay",
          style: "cancel",
        },
      ]
    );
  }


  useEffect(() => {
    if (isPressed) {
      intervalRef.current = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 1) {
            return prevCountdown - 1;
          } else {
            setIsPressed(false);
            triggerAlert(location);
            dispatch(setActiveAlert(true));
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
      const {coords} = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          timeInterval: 5000,
          distanceInterval: 0
        })
        const {latitude, longitude} = coords
        socket
        .timeout(5000)
        .emit(`Location-${location}-alert`, {location, userCoords : [latitude, longitude], helpType, username}, checkResponse(triggerAlertResponse));
    } catch (err) {
      console.error(err)
    }
  }

  async function handlePress() {
    setIsPressed(true);
    setCountdown(3);
  }

  function handleUnPress() {
    setIsPressed(false);
    setCountdown(0);
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