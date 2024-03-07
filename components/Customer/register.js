import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function CustomerRegister({ navigation }) {
    const [registerValues, setRegisterValues] = useState({
        fullname: '',
        address: '',
        username: '',
        email: '',
        password: '',
        avatarImage: '', // URL của hình ảnh
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegisterValuesChange = (prop) => (text) => {
        setRegisterValues({ ...registerValues, [prop]: text });
    };

    const handleRegister = async () => {
        setLoading(true); // Bắt đầu hiển thị loading indicator
        const registerUrl = `https://etailorapi.azurewebsites.net/api/customer-management/regis`;

        try {
            const response = await fetch(registerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    AvatarImage: registerValues.avatarImage,
                    Fullname: registerValues.fullname,
                    Address: registerValues.address,
                    Username: registerValues.username,
                    Email: registerValues.email,
                    Password: registerValues.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                await AsyncStorage.setItem('customer', JSON.stringify(data)); // Lưu trữ dữ liệu người dùng vào AsyncStorage
                navigation.navigate('Customer-Home'); // Chuyển hướng đến trang chủ của người dùng
            } else {
                const errorText = await response.text();
                setError({ ...error, login_err: errorText }); // Cập nhật thông báo lỗi
            }
        } catch (error) {
            console.error("Error:", error);
            setError({ ...error, login_err: "An unexpected error occurred." }); // Cập nhật thông báo lỗi khi có lỗi mạng/xử lý
        } finally {
            setLoading(false); // Tắt loading indicator khi hoàn tất
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <>
            {loading ? (
                <ActivityIndicator animating={true} color={'#999999'} style={styles.loading} />
            ) : (
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <View style={styles.container}>
                        <Image style={styles.logo} source={require('../assets/logo.png')} />
                        {/* Inputs */}
                        <TextInput
                            style={styles.input}
                            placeholder="Họ và tên"
                            onChangeText={handleRegisterValuesChange('fullname')}
                            value={registerValues.fullname}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Địa chỉ"
                            onChangeText={handleRegisterValuesChange('address')}
                            value={registerValues.address}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Tên đăng nhập"
                            onChangeText={handleRegisterValuesChange('username')}
                            value={registerValues.username}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleRegisterValuesChange('email')}
                            value={registerValues.email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu"
                            secureTextEntry
                            onChangeText={handleRegisterValuesChange('password')}
                            value={registerValues.password}
                        />
                        {/* Hiển thị lỗi ở đây nếu cần */}
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        <TouchableOpacity style={styles.button} onPress={() => { /* Xử lý đăng ký ở đây */ }}>
                            <Text style={styles.buttonText}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </>
    );
}

// Bạn có thể tái sử dụng hoặc mở rộng styles từ trang đăng nhập
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
        marginTop: 140,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 10,
        borderRadius: 10,
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
        color: 'red',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
});