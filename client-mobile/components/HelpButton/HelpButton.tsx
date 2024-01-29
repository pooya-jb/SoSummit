import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, ReduceMotion } from 'react-native-reanimated';

const COUNTDOWN_UNIT = 1000;
const width = useSharedValue(250);

export default function HelpButton() {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const intervalRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (isPressed) {
      intervalRef.current = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 1) {
            return prevCountdown - 1;
          } else {
            clearInterval(intervalRef.current!);
            setIsPressed(false);
            return 0;
          }
        });
      }, COUNTDOWN_UNIT);
    } else {
      // Clear interval if unpressed
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPressed]);

  function handlePress() {
    width.value = withTiming(250, {
      duration: COUNTDOWN_UNIT * 3,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      reduceMotion: ReduceMotion.System,
    });
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
      style={[
        styles.button,
        isPressed && styles.buttonPressed,
      ]}
      onPressIn={handlePress}
      onPressOut={handleUnPress}
      >
        <Text style={styles.text}>{countdown === 0 ? 'SOS' : countdown}</Text>
      </TouchableOpacity>
      <Animated.View
      style={{
        width,
      }}
      animate={{duration: COUNTDOWN_UNIT *3}}
      ></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
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
