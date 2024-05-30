import { Text, SafeAreaView, StyleSheet, View, StatusBar, Platform, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Constants from 'expo-constants';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import 'react-native-url-polyfill/auto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  LexendDeca_100Thin,
  LexendDeca_200ExtraLight,
  LexendDeca_300Light,
  LexendDeca_400Regular,
  LexendDeca_500Medium,
  LexendDeca_600SemiBold,
  LexendDeca_700Bold,
  LexendDeca_800ExtraBold,
  LexendDeca_900Black,
} from '@expo-google-fonts/lexend-deca';
import Navigation from './Navigation';
import { NotifierWrapper } from 'react-native-notifier';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  // colors: {
  //   ...DefaultTheme.colors,
  //   myOwnColor: '#BADA55',
  // },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    LexendDeca_100Thin,
    LexendDeca_200ExtraLight,
    LexendDeca_300Light,
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_600SemiBold,
    LexendDeca_700Bold,
    LexendDeca_800ExtraBold,
    LexendDeca_900Black,
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={theme}>

          <SafeAreaView style={[styles.container, { backgroundColor: "unset", marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0, }]}>
            <NotifierWrapper>

              <Navigation />
            </NotifierWrapper>
          </SafeAreaView>

        </PaperProvider>
      </GestureHandlerRootView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
  },
});
