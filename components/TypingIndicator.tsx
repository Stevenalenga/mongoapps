import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../ThemeContext';

const TypingIndicator: React.FC = () => {
  const { theme } = useTheme();
  const [dot1] = React.useState(new Animated.Value(0));
  const [dot2] = React.useState(new Animated.Value(0));
  const [dot3] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    const animation = (dot: Animated.Value) => {
      return Animated.sequence([
        Animated.timing(dot, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(dot, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]);
    };

    Animated.loop(
      Animated.stagger(200, [
        animation(dot1),
        animation(dot2),
        animation(dot3),
      ])
    ).start();
  }, []);

  const dotStyle = (animatedValue: Animated.Value) => ({
    opacity: animatedValue,
    transform: [{
      translateY: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -5],
      }),
    }],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { backgroundColor: theme.colors.text }, dotStyle(dot1)]} />
      <Animated.View style={[styles.dot, { backgroundColor: theme.colors.text }, dotStyle(dot2)]} />
      <Animated.View style={[styles.dot, { backgroundColor: theme.colors.text }, dotStyle(dot3)]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
});

export default TypingIndicator;

