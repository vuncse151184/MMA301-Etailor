import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, TextInput, Searchbar, Button, Card, Title, Paragraph, ActivityIndicator, } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import ProfileIcon from '../../assets/profile.png';
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const DismissKeyboard = () => (
    Keyboard.dismiss()
);

const OrderScreen = ({ navigation }) => {
    const _goBack = () => navigation.navigate('Staff-Tasks');
    const [text, setText] = React.useState('');
    const GET_ALL_CUS_URL = 'https://e-tailorapi.azurewebsites.net/api/customer-management'
    const [email, setEmail] = useState('');
    const [allCusData, setAllCusData] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false);
    const handleInputChange = (text) => {
        setEmail(text);
        console.log("TEXT CHANGE:", text)
        if (text.trim() != '' && loading == false) {
            const filteredData = allCusData?.filter((item) => {
                return item.email && item.email.toLowerCase().includes(text.toLowerCase());
            })
            setFilteredData(filteredData)
        }

    };

    useEffect(() => {
        const fetchAllCustomers = async () => {
            setLoading(true);
            try {
                const staffInfo = await AsyncStorage.getItem('staff');
                const token = staffInfo ? JSON.parse(staffInfo).token : '';
                const response = await fetch(GET_ALL_CUS_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();

                    navigation.navigate('Staff-Home');
                    setAllCusData(data)
                    setLoading(false);
                } else {
                    const errorText = await response.text();
                    setLoading(false);
                    console.error('Fetch error:', errorText);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCustomers();
    }, []);
    const [orderId, setOrderId] = useState('');
    const handleChoseCustomer = async (customer) => {
        console.log('Chose customer', customer);

        const fetchCustomerProfile = async () => {
            const CREATE_ORDER_URL = `https://e-tailorapi.azurewebsites.net/api/order`
            setLoading(true);
            try {
                const staffInfo = await AsyncStorage.getItem('staff');
                const token = staffInfo ? JSON.parse(staffInfo).token : '';

                let id = await AsyncStorage.getItem('orderId');
                if (!id) {
                    // If orderId doesn't exist, create it
                    const payload = JSON.stringify({
                        customerId: customer?.id,
                    })
                    console.log("PAYLOAD:", payload)
                    const response = await fetch(CREATE_ORDER_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: payload
                    });

                    if (response.ok) {
                        const data = await response.text();
                        id = data;
                        await AsyncStorage.setItem("orderId", id);
                    } else {
                        setLoading(false);
                        const errorText = await response.text();
                        console.error('Fetch error:', errorText);
                        return; // Exit early if there's an error
                    }
                }

                console.log("ORDER ID:", id);

                // Proceed with your logic using the orderId
                navigation.navigate('Staff-Order-Detail', { id: customer.id, fullname: customer.fullname, orderId: id });
            } catch (error) {
                setLoading(false);
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        await fetchCustomerProfile();
    }
    const handleCreateNewCus = () => {
        console.log('Create new customer');
        navigation.navigate('Staff-Create-Customer');
    }

    const ViewCustomer = ({ data }) => {
        return (
            data.length != 0 && (
                data.map((item) => (
                    <Card style={styles.cardContent} key={item.id} >
                        <Title style={{ ...styles.cardTitle, textAlign: 'center' }}>Thông tin khách hàng :</Title>
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Card.Cover source={ProfileIcon} style={styles.cardImg} />
                            <Card.Content style={{ width: 280, alignItems: "center", marginTop: 10 }}>
                                <Paragraph numberOfLines={1} ellipsizeMode="tail" style={{ ...styles.cardParagraph, fontWeight: 'bold' }}>Email: {item.email}</Paragraph>
                                <Paragraph numberOfLines={1} ellipsizeMode="tail" style={{ ...styles.cardParagraph, fontWeight: 'bold' }}>SĐT: {item.email}</Paragraph>
                                <Button mode="contained" style={{ marginTop: 7, alignItems: "center", fontSize: 12, width: 120, height: 40 }} onPress={() => handleChoseCustomer(item)}>
                                    Chọn <Icon name="arrow-forward-outline" size={18} />
                                </Button>
                            </Card.Content>
                        </View>
                    </Card>
                ))
            )
        );
    }

    return (
        <>

            <SafeAreaView style={styles.container} >
                <Appbar.Header style={{ height: 60 }} statusBarHeight={0}>
                    <View style={styles.headerContent}>
                        <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
                        <Appbar.Content title="Tạo đơn" style={styles.title} />
                    </View>
                </Appbar.Header>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => { DismissKeyboard() }}>
                        <View style={{ alignItems: "center" }}>
                            <View style={styles.inputWrapper}>
                                {/* <TextInput
                                    placeholder="Nhập email"
                                    right={<TextInput.Icon name="search" />}
                                    style={styles.input}
                                    dense={true}
                                    forceTextInputFocus={false}
                                    value={email}
                                    color="#9f78ff"
                                    onChangeText={handleInputChange}
                                    rippleColor="#9f78ff"
                                /> */}
                                <Searchbar
                                    placeholder="Nhập email"
                                    onChangeText={handleInputChange}
                                    value={email}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {
                        loading ? (<ActivityIndicator
                            animating={loading}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                            color={"#999999"}
                        />
                        ) : (
                            filteredData.length != 0 ? (
                                <View style={{ alignItems: 'center' }}>
                                    <ViewCustomer data={filteredData} />
                                </View>

                            ) : (
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, marginTop: 10 }}>Không tìm thấy</Text>
                                    <Button
                                        mode="contained-tonal"
                                        style={{ marginTop: 7, alignItems: "center", fontSize: 20 }}
                                        onPress={handleCreateNewCus}>
                                        <Text style={{ fontSize: 20, marginTop: 20 }}>Tạo mới</Text>
                                    </Button>
                                </View>

                            )
                        )
                    }
                </ScrollView>
            </SafeAreaView >


        </>
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: "#fff",
        elevation: 0,
    },
    inputWrapper: {
        marginTop: 20,
        marginBottom: 20,
    },
    input: {
        width: 350,
        borderWidth: 1.5,
        borderColor: '#9f78ff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    cardImg: {
        width: 64,
        height: 64,
        resizeMode: "contain"
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0,
        paddingTop: 0,
    },
    cardContent: {
        width: 380,
        marginTop: 20,
        height: 170,
        textAlign: 'center',
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? 10 : 0,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: '#9f78ff',
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#9f78ff',
    },
    cardParagraph: {
        fontSize: 14,
        width: 200,
        overflow: 'hidden',
        textOverflow: 'ellipsis',

    },

});