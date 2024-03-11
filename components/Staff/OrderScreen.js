import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, TextInput, Button, Card } from 'react-native-paper';

const OrderScreen = ({ navigation }) => {
    const _goBack = () => navigation.navigate('Staff-Tasks');
    const [text, setText] = React.useState('');
    const GET_ALL_CUS_URL = 'https://etailorapi.azurewebsites.net/api/customer-management'
    const [email, setEmail] = useState('');
    const [np, setAllCusData] = useState('')

    const handleInputChange = (text) => {
        setEmail(text);
        console.log("TEXT CHANGE:", text)
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

    const ViewCustomer = () => {
        return (
            <View>
                <Card>
                    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                    <Card.Content>
                        <Title>Card title</Title>
                        <Paragraph>Card content</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
                </Card>
            </View>
        )
    }


    return (

        <SafeAreaView style={styles.container}>
            <Appbar.Header mode={Platform.OS === 'ios' ? 'center-aligned' : 'small'} style={styles.header}>
                <View style={styles.headerContent}>
                    <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
                    <Appbar.Content title="Tạo đơn" style={styles.title} />
                </View>
            </Appbar.Header>
            <View>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <TextInput
                        mode="outlined"
                        placeholder="Nhập email"
                        right={<TextInput.Affix text="/100" />}
                        style={{ width: 350, boderRadius: 10}}
                        dense={true}
                        value={email}
                        onChangeText={handleInputChange}
                    />
                </View>

                <View>
                    <ViewCustomer />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

});