import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { styles } from './HelpButton.styles';
import { ButtonProps } from '../../utils/types';

const COUNTDOWN_UNIT = 1000;

const HelpButton: React.FC<ButtonProps> = ({
  countdown,
  setCountdown,
  isPressed,
  setIsPressed,
  setShowMessage,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPressed) {
      intervalRef.current = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 1) {
            return prevCountdown - 1;
          } else {
            setIsPressed(false);
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

  function handlePress() {
    setIsPressed(true);
    setCountdown(3);
  }

  function handleUnPress() {
    setIsPressed(false);
    setCountdown(0);
  }

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, isPressed && styles.buttonPressed]}
        onPressIn={handlePress}
        onPressOut={handleUnPress}
      >
        <Text style={styles.text}>{countdown === 0 ? 'SOS' : countdown}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HelpButton;