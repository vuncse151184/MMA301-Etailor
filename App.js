import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotifierWrapper } from 'react-native-notifier';
import Navigation from './Navigation';
import AnimatedSplashScreen from './components/CustomSplashScreen';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
};
console.disableYellowBox = true;

export default function App() {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  const handleAnimationEnd = () => {
    setIsSplashScreenVisible(false);
  };

  if (isSplashScreenVisible) {
    return <AnimatedSplashScreen onAnimationEnd={handleAnimationEnd} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <NotifierWrapper>
          <View style={[styles.container, { backgroundColor: 'unset', marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : Constants.statusBarHeight, flex: 1 }]}>
            <Navigation />
          </View>
        </NotifierWrapper>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
  },
});
