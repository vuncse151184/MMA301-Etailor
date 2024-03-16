import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetail2 = ({ route, navigation }) => {
    const { product } = route.params;
    const [isFavorite, setIsFavorite] = useState(product.isSaved);

    useEffect(() => {
        const updateFavoriteStatus = async () => {
            try {
                const favoriteProducts = await AsyncStorage.getItem('favoriteProducts');
                if (favoriteProducts) {
                    const updatedFavoriteProducts = JSON.parse(favoriteProducts);
                    const isProductSaved = updatedFavoriteProducts.some(
                        (favProduct) => favProduct.id === product.id
                    );
                    setIsFavorite(isProductSaved);
                }
            } catch (error) {
                console.log('Error retrieving favorite products:', error);
            }
        };

        updateFavoriteStatus();
    }, [product.id]);

    const toggleFavorite = async () => {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite); // Use callback to update the state

        const updatedProduct = {
            ...product,
            isSaved: !isFavorite, // Update the isSaved property based on the new state value
        };

        try {
            const favoriteProducts = await AsyncStorage.getItem('favoriteProducts');
            let updatedFavoriteProducts = [];

            if (favoriteProducts) {
                updatedFavoriteProducts = JSON.parse(favoriteProducts);
                const index = updatedFavoriteProducts.findIndex(
                    (favProduct) => favProduct.id === updatedProduct.id
                );

                if (index !== -1) {
                    updatedFavoriteProducts.splice(index, 1);
                } else {
                    updatedFavoriteProducts.push(updatedProduct);
                }
            } else {
                updatedFavoriteProducts.push(updatedProduct);
            }

            await AsyncStorage.setItem(
                'favoriteProducts',
                JSON.stringify(updatedFavoriteProducts)
            );
        } catch (error) {
            console.log('Error updating favorite products:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Image source={{ uri: product.url }} style={styles.image} />
            <Text style={styles.name}>{product.productName}</Text>
            <Text style={styles.price}>Ngày đăng: {product.price}</Text>
            <Text style={styles.specification}>{product.description}</Text>
        </View>
    );
};

const styles = {
    container: {
        // flex: 1,
        top: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 400,
        height: 400,
        borderRadius: 20,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#1e81b0',
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    specification: {
        fontSize: 15,
        color: 'black',
        marginVertical: 2,
        top: 15,
    },
    backButton: {
        position: 'absolute',
        top: -60,
        left: 10,
        zIndex: 1, // To make sure the button appears above the image
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
    },
    backText: {
        color: 'white',
        fontSize: 16,
    },
};

export default ProductDetail2;
