import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackGroundImg from '../../assets/images/4891599.jpg';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
export default function StaffLogin({ navigation }) {
    const [loginValues, setLoginValues] = useState({
        username: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState({
        login_err: "",
        otp_err: "",
        regis_username_err: "",
        regis_password_err: ""
    })

    const handleLoginValuesChange = (prop) => (text) => {
        setLoginValues({ ...loginValues, [prop]: text });
    };
    const handleLogin = async () => {
        setLoading(true);
        const staffLogin_Url = `https://etailorapi.azurewebsites.net/api/auth/staff/login`;

        try {
            const response = await fetch(staffLogin_Url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: loginValues.username,
                    password: loginValues.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                await AsyncStorage.setItem('staff', JSON.stringify(data));
                navigation.navigate('Staff-Home');
            } else {
                const errorText = await response.text();
                setError({ ...error, otp_err: errorText });
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <>
            {loading ? (
                <ActivityIndicator animating={loading} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} color={'#999999'} />
            ) : (
                < TouchableWithoutFeedback onPress={dismissKeyboard} >
                    <View style={styles.container} >
                        <Image style={styles.logo} source={require('../../assets/logo.png')} />
                        {/* <Image style={styles.backGroundImage} source={require('../../assets/images/26785.jpg')} /> */}
                     
                        <TextInput
                            style={styles.input}
                            placeholder="Tên đăng nhập"
                            onChangeText={handleLoginValuesChange('username')}
                            value={loginValues.username}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu"
                            onChangeText={handleLoginValuesChange('password')}
                            value={loginValues.password}
                            secureTextEntry
                        />
                        {error.login_err.length > 0 && <span style={{ color: "red", fontSize: "12px", paddingLeft: "5px" }}>{error.login_err}</span>}
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View >
                </TouchableWithoutFeedback >
            )
            }

        </>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
    },
    backGroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // to cover the entire container
    },
    heading: {
        fontSize: 24,
        marginBottom: 24,
    },
    logo: {
        height: 128,
        width: 128,
        marginBottom: 24,
        marginTop: 140
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 10,
        borderRadius:10
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});