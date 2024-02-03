import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackGroundImg from '../../assets/images/4891599.jpg';

export default function StaffLogin({ navigation }) {
    const [loginValues, setLoginValues] = useState({
        username: "",
        password: ""
    })

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
        console.log('Username:', loginValues.username);
        console.log('Password:', loginValues.password);
        const staffLogin_Url = `https://etailorapi.azurewebsites.net/api/auth/staff/login`

        try {
            const response = await fetch(staffLogin_Url, {
                method: "POST",
                headers: {
                    "Content-Type": " application/json",
                },

                body: JSON.stringify({
                    username: loginValues.username,
                    password: loginValues.password,
                }),
            });

            if (response.ok) {
                const data = await response.json()
                console.log(response)
                await AsyncStorage.setItem('staff', JSON.stringify(data.token));
                navigation.navigate('Staff-Home');
            }
            else {
                const errorText = await response.text()
                setError({ ...error, otp_err: errorText })
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
                <Text style={styles.heading}>
                    Đăng nhập
                </Text>
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
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
    },
    heading: {
        fontSize: 24,
        marginBottom: 24,
    },
    logo: {
        height: 128,
        width: 128,
        marginBottom: 24,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 10,
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
