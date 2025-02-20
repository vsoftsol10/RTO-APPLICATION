import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';

const SplashScreen = ({ onAnimationComplete }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const text = "Urimam";
  const letterAnims = useRef(
    text.split('').map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Initial delay before starting animations
    const initialDelay = 300;

    // Logo animation sequence
    const logoAppear = Animated.timing(scaleAnim, {
      toValue: 0.8,
      duration: 1000,
      useNativeDriver: true,
    });

    const logoBounce = Animated.spring(scaleAnim, {
      toValue: 1.5,
      tension: 40,
      friction: 8,
      useNativeDriver: true,
    });

    // Letter animations with shorter delays
    const letterAnimations = letterAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 1000,
        delay: 1000 + (index * 200), // Reduced delay before letters start
        useNativeDriver: true,
      })
    );

    // Run the complete animation sequence
    setTimeout(() => {
      Animated.sequence([
        logoAppear,
        Animated.delay(300), // Reduced pause after initial appear
        logoBounce,
        Animated.delay(300), // Reduced pause before letters
        Animated.stagger(100, letterAnimations),
        Animated.delay(800) // Final pause before completion
      ]).start(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      });
    }, initialDelay);

    return () => {
      // Reset animations on cleanup
      scaleAnim.setValue(0);
      letterAnims.forEach(anim => anim.setValue(0));
    };
  }, []);

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  return (
    <View style={styles.container}>
      <AnimatedImage
        source={require('../../../assets/car-logo.png')}
        style={[
          styles.logo,
          {
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim.interpolate({
              inputRange: [0, 0.8],
              outputRange: [0, 1],
            }),
          },
        ]}
        resizeMode="contain"
      />
      
      <View style={styles.textContainer}>
        {text.split('').map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.text,
              {
                opacity: letterAnims[index],
                transform: [
                  {
                    translateY: letterAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 64,
    color: '#8B008B',
    fontFamily: 'MellyShopia',
  },
});

export default SplashScreen;