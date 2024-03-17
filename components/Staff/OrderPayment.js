import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, TextInput, Button, HelperText, ActivityIndicator } from 'react-native-paper';
import { Realtime } from './Realtime';
const OrderPayment = ({ navigation, route }) => {
    const { id, fullname, orderId, amount } = route.params;
    const [qrCode, setQrCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const _goBack = () => navigation.navigate("Staff-Order-Detail", { id: id, fullname: fullname, orderId });
    const vnpayNotification = Realtime()

    useEffect(() => {
        if (
            vnpayNotification !== null &&
            vnpayNotification !== undefined &&
            vnpayNotification !== ""
        ) {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: vnpayNotification,
                showConfirmButton: false,
            });
        }
    }, [vnpayNotification])

    const handlePayment = async (platform) => {
        const staffInfo = await AsyncStorage.getItem('staff');
        setLoading(true);
        const token = staffInfo ? JSON.parse(staffInfo).token : '';
        const urlCreateNew = `https://e-tailorapi.azurewebsites.net/api/payment/${orderId}?amount=${amount}&payType=0&platform=${platform}`;
        try {
            const response = await fetch(urlCreateNew, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok && response.status === 200) {
                const responseData = await response.json();
                if (platform === "VN Pay") {
                    setLoading(false);
                    setQrCode(responseData.qrImage)
                    setData(responseData);
                    // window.open(responseData);
                    // handleDataOrderDetail();
                } else {
                    // handleDataOrderDetail();
                }
                return 1;
            } else if (response.status === 400 || response.status === 500) {
                const responseData = await response.text();
                return 0;
            }
        } catch (error) {
            console.error("Error calling API:", error);
        }

    }
    console.log("QR CODE:", qrCode)
    return (
        <View>
            <Appbar.Header style={{ height: 60 }} statusBarHeight={0}>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="Thanh toán" />
            </Appbar.Header>

            <View style={styles.content}>
                <Text style={styles.orderInfo}>Order ID: {orderId}</Text>
                <Text style={styles.orderInfo}>Customer Name: {fullname}</Text>
                <Button onPress={() => handlePayment('VN Pay')} >
                    VnPay
                </Button>
                {/* <View>
                    <Button
                        mode="contained"
                        onPress={handlePayment}
                        style={styles.paymentButton}
                    >
                        Thanh toán
                    </Button>
                </View> */}

                {loading ? <ActivityIndicator animating={true} color="#000" /> : (
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: `data:image/png;base64,${data.qrImage}` }}
                    />

                )}
            </View>
        </View >
    )
}

export default OrderPayment

const styles = StyleSheet.create({})