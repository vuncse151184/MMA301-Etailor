import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import ProfileIcon from '../../assets/profile.png';

const OrderScreen = ({ navigation }) => {
    const _goBack = () => navigation.navigate('Staff-Tasks');
    const [text, setText] = React.useState('');
    const GET_ALL_CUS_URL = 'https://e-tailorapi.azurewebsites.net/api/customer-management'
    const [email, setEmail] = useState('');
    const [allCusData, setAllCusData] = useState('')
    const [filteredData, setFilteredData] = useState('')
    const handleInputChange = (text) => {
        setEmail(text);
        console.log("TEXT CHANGE:", text)
        const filteredData = allCusData.filter((item) => {
            return item.email && item.email.toLowerCase().includes(text.toLowerCase());
        })
        setFilteredData(filteredData)
    };

    useEffect(() => {
        const fetchAllCustomers = async () => {
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
                    await AsyncStorage.setItem('staff', JSON.stringify(data));
                    navigation.navigate('Staff-Home');
                    setAllCusData(data)
                } else {
                    const errorText = await response.text();
                    console.error('Fetch error:', errorText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAllCustomers();
    }, [navigation]);
    const handleChoseCustomer = () => {
        navigation.navigate('Staff-Order-Product');
    }

    const ViewCustomer = ({ data }) => {

        return (
            data.length != 0 ? (
                data.map((item) => (
                    <Card style={styles.cardContent} key={item.id} >
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Card.Cover source={ProfileIcon} style={styles.cardImg} />
                            <Card.Content style={{ width: 280 }}>
                                <Title style={styles.cardTitle}>Thông tin khách hàng :</Title>
                                <Paragraph numberOfLines={1} ellipsizeMode="tail" style={styles.cardParagraph}>Email: {item.email}</Paragraph>
                                <Paragraph numberOfLines={1} ellipsizeMode="tail" style={styles.cardParagraph}>SĐT: {item.email}</Paragraph>
                                <Button mode="contained" style={{ marginTop: 7, alignItems: "center", fontSize: 12, width: 180, height: 40 }} onPress={(handleChoseCustomer)}>
                                    Chọn sản phẩm <Icon name="arrow-forward-outline" size={18} />
                                </Button>
                            </Card.Content>

                        </View>
                    </Card>
                ))
            ) : (
                <Text>Không có dữ liệu</Text>
            )
        );
    }

    return (

        <SafeAreaView style={styles.container}>
            <Appbar.Header mode={'small'}>
                <View style={styles.headerContent}>
                    <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
                    <Appbar.Content title="Tạo đơn" style={styles.title} />
                </View>
            </Appbar.Header>
            <View style={{ alignItems: "center" }}>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <TextInput
                        mode="outlined"
                        placeholder="Nhập email"
                        right={<TextInput.Icon name="search" onPress={() => console.log('Icon pressed')} />}
                        style={{ width: 350, boderRadius: 10 }}
                        dense={true}
                        value={email}
                        onChangeText={handleInputChange}
                    />
                </View>

                <View>
                    <ViewCustomer data={filteredData} />
                </View>


            </View>

        </SafeAreaView>
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
    cardImg: {
        width: 64,
        height: 64,
        resizeMode: "contain"
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent: {
        width: 350,
        marginTop: 10,
        marginBottom: 10,
        height: 150,
        textAlign: 'center',
        paddingTop: 5,
        paddingHorizontal: 20,
        border: '1px solid #9f78ff'
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