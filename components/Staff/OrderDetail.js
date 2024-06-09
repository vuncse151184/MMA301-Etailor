import { StyleSheet, Dimensions, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Appbar, Text, TextInput, Button, Title, Card, Divider, Dialog, Portal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import NoOrder from '../../assets/images/no-order.jpg'
import Icon from "react-native-vector-icons/Ionicons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').width;
function formatCurrency(amount) {
    if (amount) {
        const strAmount = amount.toString();
        const parts = [];
        for (let i = strAmount.length - 1, j = 0; i >= 0; i--, j++) {
            if (j > 0 && j % 3 === 0) {
                parts.unshift(".");
            }
            parts.unshift(strAmount[i]);
        }
        return parts.join("") + "đ";
    }
    return null;
}

export default function OrderDetail({ navigation, route }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const { id, fullname, orderId } = route.params;
    const GET_ORDER_DETAILS = `https://e-tailorapi.azurewebsites.net/api/order/${orderId}`
    const [orderDetails, setOrderDetails] = useState([]);

    const handleAddProduct = () => {
        navigation.navigate("Staff-Order-Product", { orderId: orderId, fullname: fullname, id: id });

    }
    const [amount, setAmount] = useState(0);
    const fetchOrderDetails = async () => {
        try {
            setIsLoaded(true);
            const staffInfo = await AsyncStorage.getItem('staff');
            const token = staffInfo ? JSON.parse(staffInfo).token : '';
            const response = await fetch((GET_ORDER_DETAILS), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                // // console.log("DATA:", data)
                setIsLoaded(false);
                data.products.push(undefined)
                setOrderDetails(data);
                setAmount(data.totalPrice)
            }
        } catch (error) {
            console.error(error);
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {

                await fetchOrderDetails();

            };
            fetchData();
        }, [])
    );

    const CustomTabIcon = ({ name, onPress }) => (
        <TouchableOpacity
            onPress={() => {
                onPress();
            }}
            style={{ position: "absolute", zIndex: 5, top: 10, right: 10 }}
        >
            <Icon name={name} size={30} color="#000000" />
        </TouchableOpacity>
    );
    const handleRemoveProduct = async (productId) => {
        setVisible(false);
        const staffInfo = await AsyncStorage.getItem('staff');
        const token = staffInfo ? JSON.parse(staffInfo).token : '';
        const REMOVE_PRODUCT = `https://e-tailorapi.azurewebsites.net/api/product/${productId}`
        const response = await fetch(REMOVE_PRODUCT, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.text();
            fetchOrderDetails();
        }

    };
    const [visible, setVisible] = React.useState(false);

    const hideDialog = () => setVisible(false);
    const [item, setItem] = useState('');
    const openDialog = (productId) => {
        setVisible(true);
        setItem(productId);
    }
    const handlePayment = () => {
        navigation.navigate("Staff-Order-Payment", { orderId: orderId, fullname: fullname, id: id, amount: amount });
    }

    return (
        <View style={{ position: "relative" }}>
            <Appbar.Header style={{ height: 60 }} statusBarHeight={0}>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title="Danh sách sản phẩm" />
            </Appbar.Header>
            <View style={styles.orderContent}>
                {isLoaded ? <ActivityIndicator style={{ marginTop: 200 }} animating={true} color={MD2Colors.pinkA200} /> : (
                    orderDetails?.products?.length === 0 || (orderDetails?.products?.length === 1 && orderDetails?.products[0] === undefined) ? (
                        <View style={{ alignItems: "center", marginTop: 100, textAlign: 'center', }}>
                            <Text style={{ fontSize: 18 }}>Chưa có sản phẩm nào</Text>
                            <Button onPress={() => handleAddProduct()}>Thêm mới</Button>
                            <Image source={NoOrder} style={{
                                width: WIDTH * 0.8, height: HEIGHT * 0.8, borderRadius: 15, marginTop: 50, resizeMode: 'contain'
                            }} />
                        </View>

                    ) : (
                        <ScrollView style={{ marginBottom: 55, position: "relative", flex: 1 }}>

                            <View >
                                <FlatList
                                    style={styles.cardWrapper}
                                    data={orderDetails.products}
                                    numColumns={2}
                                    renderItem={({ item }) => (
                                        item !== undefined ? (
                                            <Card style={styles.cardContainer}>
                                                <CustomTabIcon
                                                    name="close-circle"
                                                    onPress={() => openDialog(item.id)}
                                                />
                                                <Card.Cover source={{ uri: item.templateThumnailImage }} style={styles.cardImg} />
                                                <Divider />
                                                <Card.Title title={item.name} style={styles.cardTitle} />
                                            </Card>
                                        ) : (
                                            <Card
                                                style={[styles.cardContainer]}
                                                onPress={() => handleAddProduct()}
                                            >
                                                <Button>THÊM MỚI</Button>


                                            </Card>
                                        ))}
                                    keyExtractor={(item, index) => index.toString()}
                                />


                            </View>

                        </ScrollView>
                    )

                )
                }
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} >
                    <Dialog.Title>Xoá sản phẩm này?</Dialog.Title>
                    <Dialog.Actions>
                        <Button onPress={() => hideDialog()}>Huỷ</Button>
                        <Button onPress={() => handleRemoveProduct(item)}>Xoá</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            {/* {(orderDetails?.products?.length !== 0 || orderDetails?.products[0] !== undefined) && (
                
            )} */}
            {orderDetails?.totalPrice !== 0 && (
                <View style={{ flexDirection: "row", position: "absolute", bottom: 30, right: 10, left: 10 }}>
                    <View style={{ flexDirection: "row", backgroundColor: '#ffffff', paddingLeft: 50, height: 60, width: "100%", alignItems: "center", borderRadius: 40 }}>
                        <Text style={styles.infoLabel}>Giá:</Text>
                        <Text style={styles.infoValue}>{formatCurrency(orderDetails.totalPrice)} đ</Text>
                        <TouchableOpacity onPress={handlePayment} style={{ backgroundColor: '#9f78ff', paddingLeft: 20, height: 60, width: 180, alignItems: "center", justifyContent: "center", borderRadius: 40 }}>
                            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                                Thanh toán
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View >

    )

}

const styles = StyleSheet.create({
    cardImg: {
        width: WIDTH * 0.4,
        height: HEIGHT * 0.4,
        resizeMode: 'contain',
    },
    orderContent: {
        width: WIDTH,
        height: HEIGHT * 1.75,
    },
    cardWrapper: {
        color: "#000000"
    },
    cardTitle: {

    },

    cardContainer: {
        width: WIDTH * 0.4,
        height: HEIGHT * 0.52,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 15,
        position: "relative",
        justifyContent: "center",
    },
    card: {
        backgroundColor: 'transparent',
        marginRight: 10,
        elevation: 0,
        marginHorizontal: 15,
        textAlign: 'center',
        border: 'none',
    },
    additionalInfo: {
        marginBottom: 10,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 80,
        left: 20,
        right: 20,
    },
    infoLabel: {
        fontWeight: "bold",
        marginRight: 5,
        color: "#9f78ff",
    },
    infoValue: {
        flex: 1,
        fontWeight: 'bold',
        color: "#9f78ff",
    },
})