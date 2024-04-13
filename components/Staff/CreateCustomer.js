import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ToastAndroid, ScrollView } from 'react-native'
import React from 'react'
import {
    Appbar,
    Banner,
    Avatar,
    Button,
    Card,
    IconButton,
    Text,
    Chip,
    ActivityIndicator,
    SegmentedButtons,
    Divider,
} from "react-native-paper";
import { TextInput } from 'react-native';



const CreateCustomer = ({ navigation }) => {
    const showToast = () => {
        ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
    };

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'Tạo mới thành công',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    const showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
            'A wild toast appeared!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    };
    const DismissKeyboard = () => (
        Keyboard.dismiss()
    );
    const [customerData, setCustomerData] = React.useState({
        Username: "",
        Email: "",
        Fullname: "",
        Phone: 0,
    });
    const handleChange = (prop, value) => {
        setCustomerData({ ...customerData, [prop]: value });
    };
    const handleRegister = async () => {
        const formData = new FormData();
        formData.append("Email", customerData.Email);
        formData.append("Username", customerData.Username);
        formData.append("Fullname", customerData.Fullname);
        formData.append("Phone", customerData.Phone);
        const LOGIN_URL = `https://e-tailorapi.azurewebsites.net/api/customer-management/regis`;
        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                body: formData,
            });
            console.log("hi", JSON.stringify(response));
            if (response.ok) {
                const data = await response.json();
                showToastWithGravity()
                console.log(response);

            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={() => { DismissKeyboard() }}>
            <View >
                <Appbar.Header style={{ height: 60 }} statusBarHeight={0}>
                    <Appbar.BackAction onPress={navigation.goBack} />
                    <Appbar.Content title="Khách hàng mới" />
                </Appbar.Header>
                <ScrollView>

                    <View style={{ justifyContent: "center", alignItems: "center", margin: 20 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            Thông tin khách hàng
                        </Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <View style={{ justifyContent: "space-between", flexDirection: "collumn" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, margin: 5 }}>Họ và tên:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Họ và tên"
                                onChangeText={value => handleChange("Fullname", value)}
                                autoCapitalize="none"
                                value={customerData.Fullname}
                            />
                        </View>

                        <View style={{ justifyContent: "space-between", flexDirection: "collumn" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, margin: 5 }}>Email:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Địa chỉ email"
                                onChangeText={value => handleChange("Email", value)}
                                value={customerData.Email}
                            />
                        </View>
                        <View style={{ justifyContent: "space-between", flexDirection: "collumn" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, margin: 5 }}>Số điện thoại:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Số điện thoại"
                                onChangeText={value => handleChange("Phone", value)}
                                keyboardType='numeric'
                                value={customerData.Phone}
                            />

                        </View>
                        <View style={{ justifyContent: "space-between", flexDirection: "collumn" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, margin: 5 }}>Tên tài khoản:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Tên đăng nhập"
                                onChangeText={value => handleChange("Username", value)}
                                autoCapitalize="none"
                                value={customerData.Username}
                            />
                            <Button title="Toggle Toast" onPress={() => showToast()} />

                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Button
                                mode="contained"
                                onPress={() => handleRegister()}
                                style={{ margin: 20, width: 150 }}
                            >
                                Thêm mới
                            </Button>
                        </View>

                    </View>
                </ScrollView>
            </View >
        </TouchableWithoutFeedback >


    )
}

export default CreateCustomer

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: "80%",
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 10,
        borderRadius: 10,
    },
})