import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image, Animated, Dimensions, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import banner from '../data/banner';
import { Appbar, Avatar, Card, Title } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";



// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').width;

const dataMau = [
    {
        id: '1',
        title: "Áo sơ mi",
        description: 'Thầy cho em qua môn nhé hehe',
        image: "https://e-tailor.vercel.app/static/media/414110991e17d3770d91742e46c39121.72c5ce899b316ffd55c4.jpg"

    },
    {
        id: '2',
        title: "Áo dài",
        description: 'Nguyễn Công Vũ',
        image: 'https://e-tailor.vercel.app/static/media/e71121ea0e13b8391dc7e1f8026fe4c8.c28a2255d5c16f46bc2e.jpg'
    },
    {
        id: '3',
        title: "Quần tây",
        description: "Nguyen Cong Vu",
        image: 'https://e-tailor.vercel.app/static/media/9294174f7778b13ee82e7861b749603f.6703b113c1b0d2016624.jpg'
    },
    {
        id: '4',
        title: "Áo vest",
        description: "Nguyen Cong Vu",
        image: 'https://e-tailor.vercel.app/static/media/vest.bb2ba1ee8bea8b2706ab.jpg'
    },

]


export default function StaffProfile() {
    const [activeImg, setActiveImg] = useState(0);
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [orchidsData, setOrchidsData] = useState([]);
    const [activeCate, setActiveCate] = useState(0)

    const currentDate = new Date().toLocaleDateString('vi', { day: 'numeric', month: 'long', year: 'numeric' });
    const formattedDate = currentDate.replace(',', '');
    useEffect(() => {
        setData(dataMau);
    }, []);

    const onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide !== activeImg) {
                setActiveImg(slide);
            }
        }
    };
    const handleUnselectCategory = async () => {
        setSelectedData('')
        setActiveCate(0)
    }

    const handleSelectCategory = () => { }

    return (
        <>
            <View style={styles.container}>
                <ScrollView >
                    <Appbar.Header mode='small' style={{ backgroundColor: "#e05371", height: 40 }}>
                        <Appbar.Content
                            title={
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -20 }}>
                                    <Avatar.Image size={50} source={require('../../assets/images/user-avatar.jpg')} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
                                            Tomlenek
                                        </Text>
                                        {formattedDate ? (
                                            <Text style={{ fontSize: 14, fontWeight: "300", color: "#fff" }}>
                                                {formattedDate}
                                            </Text>
                                        ) : ''}
                                    </View>
                                </View>
                            }
                        />
                        <View style={{ marginRight: 20, marginTop: -20 }}>
                            <Icon name="notifications-circle" size={30} color="#fff" />
                        </View>
                    </Appbar.Header>


                    <View style={styles.wrap}>
                        <ScrollView
                            onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            horizontal
                            style={styles.wrap}
                        >
                            {banner.map((banner, index) => (
                                <Image
                                    key={banner.id}
                                    resizeMode='stretch'
                                    style={styles.wrap}
                                    source={{ uri: banner.image }}
                                />
                            ))}
                        </ScrollView>
                        <View style={styles.wrapDot}>
                            {banner.map((banner, index) => (
                                <Text
                                    key={banner.id}
                                    style={activeImg === index ? styles.dotActive : styles.dot}
                                >
                                    ●
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View style={{ height: 230, marginTop: 45 }}>
                        <TouchableWithoutFeedback>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginHorizontal: 20 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Danh mục</Text>
                                    <TouchableWithoutFeedback onPress={handleUnselectCategory}>
                                        <Text style={{ fontSize: 16, color: "#e05371", fontWeight: 700 }}>Xem tất cả</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={{ height: 128 }}>
                                    <FlatList
                                        style={styles.flatList}
                                        horizontal={true}
                                        data={data}
                                        renderItem={({ item }) => (
                                            <Card
                                                style={styles.card}
                                                onPress={() => handleSelectCategory(item.id)}
                                            >
                                                <Card.Cover
                                                    source={{ uri: item.image }}
                                                    style={[styles.cardImage, { alignSelf: 'center' }]}
                                                />
                                                <Card.Content style={{ textAlign: "center", alignItems: "center" }}>
                                                    <Title style={[activeCate === item.id ? styles.titleActive : styles.title, { fontSize: 15 }]}>
                                                        {item.title}
                                                    </Title>
                                                </Card.Content>
                                            </Card>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ marginTop: -50 }}>
                        <View>
                            <Text style={{ fontSize: 18, marginLeft: 20, marginBottom: 10, fontWeight: "bold" }}>Thời trang</Text>
                            <View>
                                <Image
                                    style={{ width: 410, height: 230 }}
                                    source={{ uri: 'https://e-tailor.vercel.app/static/media/Banner.269b587dbc7f37a115af.png' }} // Đường dẫn hình ảnh
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingBottom: 15,
    },
    wrap: {
        width: 400,
        height: 200,
        borderRadius: 10,
        top: 5,
        left: 2,



    },
    wrapDot: {
        position: "absolute",
        bottom: -30,
        flexDirection: "row",
        alignSelf: "center",
        zIndex: 1,
    },
    dotActive: {
        margin: 2,
        color: '#e05371'
    },
    dot: {
        margin: 3,
        color: "#D9D9D9"
    },
    cardImage: {
        width: 90,
        height: 90,
        borderRadius: 50,

    },
    card: {
        height: 120,
        width: 100,
        marginHorizontal: 2,

    },
    flatList: {
        height: 100,
    }
})

