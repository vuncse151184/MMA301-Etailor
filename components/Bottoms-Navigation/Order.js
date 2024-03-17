import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Order = () => {

    const [data, setData] = useState([])
    const fakeData = [
        {
            "id": "cb1d2490-1285-4824-afc8-6b0d76",
            "createdTime": "2024-03-12T05:31:59.377",
            "customerId": "e127339a-252c-4dfd-acf9-65b34d",
            "createrId": "18559deb-ae14-4e5a-a011-090c6b",
            "discountId": null,
            "totalProduct": 1,
            "totalPrice": 1250000,
            "discountPrice": 0,
            "discountCode": "",
            "afterDiscountPrice": 1250000,
            "payDeposit": false,
            "deposit": null,
            "paidMoney": 0,
            "unPaidMoney": 1250000,
            "status": 3,
            "thumbnailImage": "https://firebasestorage.googleapis.com/v0/b/etailor-21a50.appspot.com/o/Uploads%2FProductTemplates%2FThumnailImages%2F4e6482d2-ace1-46c9-a60f-ae6e08.jpg?alt=media&token=edf20cfb-3a3a-4df1-a0c9-fae716c07f66"
        },
        {
            "id": "cb1d2490-1485-4824-afc8-6b0d76",
            "createdTime": "2024-03-12T05:31:59.377",
            "customerId": "e127339a-252c-4dfd-acf9-65b34d",
            "createrId": "18559deb-ae14-4e5a-a011-090c6b",
            "discountId": null,
            "totalProduct": 1,
            "totalPrice": 1250000,
            "discountPrice": 0,
            "discountCode": "",
            "afterDiscountPrice": 1250000,
            "payDeposit": false,
            "deposit": null,
            "paidMoney": 0,
            "unPaidMoney": 1250000,
            "status": 3,
            "thumbnailImage": "https://firebasestorage.googleapis.com/v0/b/etailor-21a50.appspot.com/o/Uploads%2FProductTemplates%2FThumnailImages%2F4e6482d2-ace1-46c9-a60f-ae6e08.jpg?alt=media&token=edf20cfb-3a3a-4df1-a0c9-fae716c07f66"
        }
    ]
    useEffect(() => {
        axios.get(`https://etailorapi.azurewebsites.net/api/order`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => { })
    }, [])

    const handleSomething = (item) => { }
    const convertVND = (price) => {
        if (price != null && price != undefined && price != "")
            return price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
            });
        else return "0 VND";
    };
    const convertDate = (date) => {
        let fDate = new Date(date)
        return fDate.toLocaleString()
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, marginTop: 20, marginBottom: 20, paddingLeft: 10 }}>Đơn hàng</Text>
            {
                data.length == 0
                    ?
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>Hiện không có đơn hàng nào</Text>
                    : null
            }
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ width: '100%', height: 100, marginBottom: 20 }} onPress={() => handleSomething(item)}>
                        <View style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <View style={{ width: '20%', height: '100%' }}>
                                <Image style={{ width: '100%', height: '100%' }} source={{ uri: item?.thumbnailImage }} />
                            </View>
                            <View style={{ width: '80%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: 10 }}>
                                <Text>{convertVND(item?.totalPrice)}</Text>
                                <Text>Số lượng: {item?.totalProduct}</Text>
                                <Text>{convertDate(item?.createdTime)}</Text>
                            </View>

                        </View>
                        <View style={{ width: '100%', height: '25%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10 }}>
                            <Text style={{ fontSize: 18 }}>
                                Thành tiền: <Text style={{ fontSize: 18, color: '#f68308' }}>{convertVND(item?.afterDiscountPrice)}</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Order

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#ffffff',
        minHeight: '100%',
    },
})