// AnimatedSplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Dimensions,Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const AnimatedSplashScreen = ({ onAnimationEnd }) => {
    const rotation = new Animated.Value(0);

    useEffect(() => {
        const rotateAnimation = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );

        rotateAnimation.start();

        const timer = setTimeout(async () => {
            await SplashScreen.hideAsync();
            onAnimationEnd();
        }, 3000); // Duration for which the splash screen is displayed

        return () => {
            rotateAnimation.stop();
            clearTimeout(timer);
        };
    }, [onAnimationEnd]);

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Image source={require('./../assets/splash.png')} style={styles.background} />
            <Animated.View style={[styles.circle, { transform: [{ rotate }] }]}>
                <Image source={require('./../assets/circle.png')} style={styles.circleImage} />
            </Animated.View>
            <Text>
                Chào mừng bạn đến với E-tailor
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    circle: {
        position: 'absolute',
        width: 220,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleImage: {
        width: '100%',
        height: '100%',
    },
    logo: {
        width: 200,
        height: 200,
    },
});

export default AnimatedSplashScreen;
