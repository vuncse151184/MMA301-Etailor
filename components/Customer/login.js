import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';

export default function CustomerLogin({ navigation }) {
    const [loginValues, setLoginValues] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState({
        login_err: "",
        otp_err: "",
        regis_username_err: "",
        regis_password_err: ""
    });

    const handleLoginValuesChange = (prop) => (text) => {
        setLoginValues({ ...loginValues, [prop]: text });
    };

    const handleLogin = async () => {
        setLoading(true);
        const customerLogin_Url = `https://etailorapi.azurewebsites.net/api/auth/customer/login`;

        try {
            const response = await fetch(customerLogin_Url, {
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
                await AsyncStorage.setItem('customer', JSON.stringify(data));
                navigation.navigate('Customer-Home');
            } else {
                const errorText = await response.text();
                setError({ ...error, login_err: errorText });
            }
        } catch (error) {
            console.error("Error:", error);
            setError({ ...error, login_err: "An unexpected error occurred." });
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
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <View style={styles.container}>
                        <Image style={styles.logo} source={require('../../assets/logo.png')} />
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
                        {error.login_err.length > 0 && <Text style={styles.errorText}>{error.login_err}</Text>}
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
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
        borderRadius: 10
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
    errorText: {
        color: "red",
        fontSize: 12,
        paddingLeft: 5,
        marginBottom: 5,
    },
});
