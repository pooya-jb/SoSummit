import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function HelpButton() {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const intervalRef = React.useRef<number | null>(null);

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
      }, 1000);
    } else {
      // Clear interval if unpressed
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Reset countdown to 0 on release
      setCountdown(0);
    }

    // Cleanup interval on component unmount
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
      style={[
        styles.button,
        isPressed && styles.buttonPressed,
      ]}
      onPressIn={handlePress}
      onPressOut={handleUnPress}
      >
        <Text style={styles.text}>{countdown === 0 ? 'SOS' : countdown}</Text>
      </TouchableOpacity>
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
