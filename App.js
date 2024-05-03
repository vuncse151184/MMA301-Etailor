import { Text, SafeAreaView, StyleSheet, View, StatusBar, Platform, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
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
      <PaperProvider theme={theme}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0, }}>
          <Navigation />
        </SafeAreaView>
      </PaperProvider>
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
