import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import colors from '../../constents/colors';

const SplashScreen = ({ onAnimationComplete }) => {
  // Animation values
  const logoAnim = useRef(new Animated.Value(0)).current;
  const text = "Urimam";
  
  // Individual letter animations for ultra-smooth effect
  const letterAnims = useRef(
    text.split('').map(() => ({
      opacity: new Animated.Value(0),
      position: new Animated.Value(0),
      scale: new Animated.Value(0),
      rotation: new Animated.Value(0)
    }))
  ).current;
  
  // Add a text container animation for additional effect
  const textContainerAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Initial delay before starting animations
    const initialDelay = 500; // Increased from 300 to 500

    // Logo animation with spring for more natural movement
    const logoAppear = Animated.spring(logoAnim, {
      toValue: 1,
      friction: 7, // Increased from 6 to 7 for slower movement
      tension: 35, // Decreased from 40 to 35 for slower movement
      useNativeDriver: true,
    });

    // Text container animation - FURTHER SLOWED DOWN
    const textContainerAppear = Animated.timing(textContainerAnim, {
      toValue: 1,
      duration: 1600, // Increased from 1200 to 1600
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    });

    // Create super smooth letter-by-letter animations - FURTHER SLOWED DOWN
    const letterAnimations = letterAnims.flatMap((anim, index) => {
      // Calculate staggered delay based on letter position
      // FURTHER INCREASED DELAY BETWEEN LETTERS
      const baseDelay = index * 320; // Increased from 240 to 320
      
      return [
        // Scale and rotation animation - FURTHER SLOWED DOWN
        Animated.timing(anim.scale, {
          toValue: 1,
          duration: 1200, // Increased from 900 to 1200
          delay: baseDelay,
          easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), // Bouncy easing
          useNativeDriver: true,
        }),
        
        // Opacity animation - FURTHER SLOWED DOWN
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 1100, // Increased from 800 to 1100
          delay: baseDelay,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
        
        // Position animation - FURTHER SLOWED DOWN
        Animated.timing(anim.position, {
          toValue: 1,
          duration: 1300, // Increased from 1000 to 1300
          delay: baseDelay + 100, // Increased from 80 to 100
          easing: Easing.bezier(0, 0.8, 0.2, 1), 
          useNativeDriver: true,
        }),
        
        // Subtle rotation animation - FURTHER SLOWED DOWN
        Animated.timing(anim.rotation, {
          toValue: 1,
          duration: 1500, // Increased from 1200 to 1500
          delay: baseDelay + 90, // Increased from 60 to 90
          easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          useNativeDriver: true,
        }),
      ];
    });

    // Run the complete animation sequence
    setTimeout(() => {
      // First animate the logo with spring physics
      logoAppear.start();
      
      // After a brief delay, animate the text container
      // FURTHER INCREASED DELAY
      setTimeout(() => {
        textContainerAppear.start();
        
        // Then start the letter animations in parallel groups for smoother effect
        Animated.parallel(letterAnimations).start(() => {
          // After all animations complete, call the completion handler
          // FURTHER INCREASED FINAL DELAY
          setTimeout(() => {
            if (onAnimationComplete) {
              onAnimationComplete();
            }
          }, 1100); // Increased from 800 to 1100
        });
      }, 800); // Increased from 600 to 800
    }, initialDelay);

    return () => {
      // Reset animations on cleanup
      logoAnim.setValue(0);
      textContainerAnim.setValue(0);
      letterAnims.forEach(anim => {
        anim.opacity.setValue(0);
        anim.position.setValue(0);
        anim.scale.setValue(0);
        anim.rotation.setValue(0);
      });
    };
  }, []);
  
  return (
    <View style={[styles.container, { backgroundColor: '#35cad1' }]}>
      {/* Stacked content container */}
      <View style={styles.contentContainer}>
        {/* Logo with spring animation */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                { scale: logoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.2, 1]
                })},
                { translateY: logoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0]
                })},
                { rotate: logoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['-10deg', '0deg']
                })}
              ],
              opacity: logoAnim,
            },
          ]}
        >
          <Animated.Image
            source={require('../../../assets/car-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        
        {/* Text container with its own animation */}
        <Animated.View 
          style={[
            styles.textOuterContainer,
            {
              opacity: textContainerAnim,
              transform: [
                { scale: textContainerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1]
                })},
                { translateY: textContainerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0]
                })}
              ]
            }
          ]}
        >
          <View style={styles.textContainer}>
            {text.split('').map((letter, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.text, 
                  { 
                    color: 'black',
                    opacity: letterAnims[index].opacity,
                    transform: [
                      { 
                        translateY: letterAnims[index].position.interpolate({
                          inputRange: [0, 1],
                          outputRange: [15, 0]
                        })
                      },
                      {
                        scale: letterAnims[index].scale.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [0.7, 1.1, 1]
                        })
                      },
                      {
                        rotate: letterAnims[index].rotation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['8deg', '0deg']
                        })
                      }
                    ],
                    textShadowColor: 'rgba(0, 0, 0, 0.2)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                  }
                ]}
              >
                {letter}
              </Animated.Text>
            ))}
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    padding: 0
  },
  logo: {
    width: '100%',
    height: '100%',
    color: colors.black,
    padding: 0
  },
  textOuterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: -40,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 64,
    fontFamily: 'MellyShopia',
    lineHeight: 64,
    margin: 0,
    padding: 0,
  },
});

export default SplashScreen;