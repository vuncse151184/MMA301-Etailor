import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { Appbar, TextInput } from 'react-native-paper';

const OrderScreen = ({ navigation }) => {
    const _goBack = () => navigation.navigate('Sample-products');
    const [text, setText] = React.useState('');
    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header mode={Platform.OS === 'ios' ? 'center-aligned' : 'small'} style={styles.header}>
                <View style={styles.headerContent}>
                    <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
                    <Appbar.Content title="Trở lại" style={styles.title} />
                </View>
            </Appbar.Header>
            <View>
                <TextInput
                    mode="outlined"
                    label="Outlined input"
                    placeholder="Type something"
                    right={<TextInput.Affix text="/100" />}
                />
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