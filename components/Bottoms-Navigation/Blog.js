import React from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import MenuItem from '../UI/MenuItem';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import dataBlog from '../data/dataBlog';
import { useNavigation } from '@react-navigation/native';


export default function StaffProfile() {
    const navigation = useNavigation();
    const navigateToProductDetail = (product) => {
        navigation.navigate('Product-detail2', { product });
    };

    return (
        <SafeAreaView styles={styles.container}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://e-tailor.vercel.app/static/media/surprised-curly-woman-beret-looks-left-charming-lady-pink-sweater-sunglasses-green-skirt-holds-grey-handbag.40488a0d6f3386ec5a93.jpg' }}
                    />
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: 27, color: 'white', fontStyle: 'italic' }}> <Text style={{ color: 'yellow', fontWeight: 'bold', fontStyle: 'italic' }}>De</Text>lovely.</Text>
                        <Text style={{ fontSize: 24, color: 'white', fontStyle: 'italic' }}> <Text style={{ color: 'yellow', fontWeight: 'bold', fontStyle: 'italic' }}>De</Text>licious.</Text>
                        <Text style={{ fontSize: 22, color: 'white', fontStyle: 'italic' }}> <Text style={{ color: 'yellow', fontWeight: 'bold', fontStyle: 'italic' }}>De</Text>lightful.</Text>
                    </View>
                    <View style={styles.title}>
                        <Text style={{ color: 'white' }}>Tìm hiểu thêm</Text>
                    </View>
                </View>
            </View>


            <Text style={{ fontSize: 25, marginLeft: 10, marginBottom: 10, fontWeight: "bold", top: 10 }}>Bài viết gần đây</Text>
            <FlatList
                style={{ marginTop: 5, paddingBottom: 50 }}
                data={dataBlog}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigateToProductDetail(item)}
                    >
                        <MenuItem
                            item={item}
                            onPress={() => toggleFavorite(item.id)}
                        />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
    },
    imageContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: 400,
        height: 230,
        borderRadius: 10,
    },
    textContainer: {
        position: 'absolute',
        bottom: 90,
        paddingHorizontal: 10,
        paddingVertical: 5,
        left: 100,

    },
    title: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: '#b89ccc',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 50,
        left: 20,
        borderColor: 'white',
        borderWidth: 1,
    }
});
