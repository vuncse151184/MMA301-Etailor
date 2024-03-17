import { StyleSheet, Text, View, Image, WebView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, Button, ActivityIndicator } from 'react-native-paper';
import { Realtime } from './Realtime';
import ScanMePNG from '../../assets/images/vecteezy_scan-me-png_21462615.png'
const OrderPayment = ({ navigation, route }) => {
    const { id, fullname, orderId, amount } = route.params;
    const [qrCode, setQrCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const _goBack = () => navigation.navigate("Staff-Order-Detail", { id: id, fullname: fullname, orderId });
    const vnpayNotification = Realtime()
    const handleOpenWebView = async (url) => {
        console.log("URL:", url)
        return (
            <WebView
                source={{ uri: url }}
                style={{ marginTop: 20 }}
            />
        );
    }
    useEffect(() => {
        if (
            vnpayNotification !== null &&
            vnpayNotification !== undefined &&
            vnpayNotification !== ""
        ) {
            console.log("Không có kết nối:")
        } else {
            console.log(" có kết nối:")
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
                    handleOpenWebView(responseData.link)
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
                <Image source={require('../../assets/images/vnpay.png')} style={{ width: 100, height: 100, resizeMode: "contain" }} />
                <Button onPress={() => handlePayment('VN Pay')} >
                    VNPAY
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
                    <View style={{ alignItems: "center", marginTop: 40 }}>
                        <Image source={require(`../../assets/images/vecteezy_scan-me-png_21462615.png`)} style={{ width: 340, height: 340, resizeMode: "contain", position: "relative" }} />
                        <Image
                            style={{ width: 140, height: 140, position: "absolute", right: 73, bottom: 102, margin: "auto" }}
                            source={{ uri: `data:image/png;base64,${data.qrImage}` }}
                        />
                    </View>


                )}
            </View>
        </View >
    )
}

export default OrderPayment

const styles = StyleSheet.create({})