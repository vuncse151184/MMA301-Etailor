import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    Keyboard,
    Dimensions,
    Alert
} from "react-native";
import {
    Appbar,
    TextInput,
    ActivityIndicator
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const PasswordForgot = ({ navigation }) => {
    const [staffInfo, setStaffInfo] = useState('')
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
    })
    React.useEffect(() => {
        const retrieveStaffItem = async () => {
            AsyncStorage.getItem("staff")
                .then((user) => {
                    setStaffInfo(JSON.parse(user));
                })
                .catch((error) => {
                    console.error("Error retrieving staff data:", error);
                });
        };
        retrieveStaffItem();
    }, []);

    const _goBack = () => navigation.navigate("Staff-Profile");
    const [loading, setLoading] = useState(false)
    const handleChangePassWord = async () => {
        console.log("password", password)
        setLoading(true)
        const URL = `https://e-tailorapi.azurewebsites.net/api/staff/change-password`
        const token = staffInfo.token;
        const data = {
            oldPassword: password.oldPassword,
            newPassword: password.newPassword,
        }
        const response = await fetch(URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
            , body: JSON.stringify(data)
        })

        if (response.ok) {
            setLoading(false)
            Alert.alert("Đổi mật khẩu thành công", "", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate("Staff-Profile"),
                }

            ])
        } else {
            setLoading(false)
            Alert.alert('Thất bại', 'Sai mật khẩu');
        }
    }
    return (
        <>
            <Appbar.Header style={{ height: 40 }} statusBarHeight={0}>
                <View style={styles.headerContent}>
                    <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
                    <Appbar.Content title="Đổi mật khẩu" titleStyle={styles.title} />
                </View>
            </Appbar.Header>
            <View style={styles.container}>

                <View style={{ width: "100%", marginVertical: 50 }}>
                    <TextInput
                        label="Nhập mật khẩu cũ"
                        style={styles.input}
                        secureTextEntry
                        value={password.oldPassword}
                        onChangeText={(text) => setPassword({ ...password, oldPassword: text })}
                        right={<TextInput.Icon icon="eye" />}
                    />
                    <TextInput
                        label="Nhập mật khẩu mới"
                        style={styles.input}
                        value={password.newPassword}
                        onChangeText={(text) => setPassword({ ...password, newPassword: text })}
                        secureTextEntry
                        right={<TextInput.Icon icon="eye" />}
                    />
                </View>

                <TouchableOpacity onPress={() => handleChangePassWord()}>
                    <View style={{ backgroundColor: "#000000", flexDirection: "row", justifyContent: "center", padding: 15, borderRadius: 10, width: "80%", alignSelf: "center", marginTop: 10 }}>
                        <Text style={{ color: "#fff", textAlign: "center", paddingRight: 10 }}>Đổi mật khẩu</Text>
                        {loading && <ActivityIndicator size="small" color="#fff" />}
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default PasswordForgot

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    input: {
        backgroundColor: "#fff",
        shadowColor: "#000",
        alignSelf: "center",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 30,
        borderRadius: 10,
        width: "80%",
        height: 60,
    },
    image: {
        height: 400,
        justifyContent: 'center',
    },
    logo: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        objectFit: 'contain',
        marginTop: 50,
    },
    header: {
        backgroundColor: "#fff",
        elevation: 0,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 0,
        paddingTop: 0,
    },
    title: {
        flex: 1,
        textAlign: "center",
        marginRight: 25,
        marginTop: 5,
    },
});
