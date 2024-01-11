import { Text, View, StyleSheet, Image } from 'react-native';
import {  useFonts, AlumniSans_400Regular } from '@expo-google-fonts/alumni-sans';

export default function Login() {
    let [fontsLoaded] = useFonts({
        AlumniSans_400Regular,
      });
    
      if (!fontsLoaded) {
        return null;
      }
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <Text style={styles.paragraph}>
                Đăng nhập
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    paragraph: {
        margin: 24,
        marginTop: 0,
        fontSize: 34,
        textAlign: 'center',
        fontFamily: 'AlumniSans_400Regular'
    },
    logo: {
        height: 258,
        width: 258,
    }
});
