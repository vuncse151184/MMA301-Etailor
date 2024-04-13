import React from 'react';
import { View, Image, Text } from 'react-native';

export default function MenuItem({ item }) {
    // console.log(item)
    const convertDate = (date) => {
        let fDate = new Date(date)
        return fDate.toLocaleString()
    }
    return (
        <View
            style={{
                marginLeft: 4,
                marginTop: 5,
                padding: 3,
                width: 200,
                height: 190,
                alignItems: 'center',
                marginBottom: 20,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: 1,

                }}
            >
                <Image
                    style={{
                        width: '100%',
                        height: 150,
                        resizeMode: 'cover',
                        borderRadius: 10,
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',


                    }}
                    source={{ uri: item?.thumbnail }}
                />
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {item?.title}
            </Text>
            <Text style={{ fontSize: 12, color: '#1e81b0' }}>
                Ngày đăng: {convertDate(item?.createdTime)}
            </Text>
        </View>
    )
}
