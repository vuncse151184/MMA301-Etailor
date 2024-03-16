import { FlatList, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const size = Dimensions.get('window').width / numColumns;
const SampleProducts = ({navigation, route}) => {


    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`https://e-tailorapi.azurewebsites.net/api/template-management/get-all-template`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => { })
    }, [])

    const handleTouchProduct = (item) => {
        // console.log(item);
        navigation.navigate('ProductDetail', { product: item });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sản phẩm mẫu</Text>
            {/* <Text style={styles.sampleName}>Sample Products</Text> */}
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View>
                        <Text style={{ textAlign: 'left', fontSize: 20, marginLeft: 10, marginBottom: 10 }}>{item?.name}</Text>
                        <FlatList
                            data={item?.productTemplates}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleTouchProduct(item)} style={styles.itemContainer}>
                                    <Image style={styles.image} source={{ uri: item.thumbnailImage }} />
                                    <Text style={styles.item}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
                keyExtractor={item => item.id}
                numColumns={1} />
        </View>
    )
}

export default SampleProducts

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#ffffff',
        minHeight: '100%',
        paddingBottom: 50,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        marginTop: 20,
        paddingLeft: 10,
        fontSize: 24,
        marginBottom: 20
    },
    image: {
        width: screenWidth / numColumns - 50,
        height: screenWidth / numColumns - 50, // Assuming square images
        resizeMode: 'cover',
        borderRadius: 10,
    },
    itemContainer: {
        width: size,
        height: size + 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 4,
        borderRadius: 10,
        shadowColor: '#000',
    },
    item: {
        flex: 1,
        margin: 3,
        textAlign: 'center',
        fontSize: 16
    }
})