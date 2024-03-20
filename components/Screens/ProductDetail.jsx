import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Appbar, } from 'react-native-paper';
const ProductDetail = ({ navigation, route }) => {
  const { product } = route.params;

  const _goBack = () => {
    navigation.navigate("Sample-products", {});
  };

  const handleOrder = () => { };
  const convertVND = (price) => {
    if (price != null && price != undefined && price != "")
      return price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
    else return "0 VND";
  };
  //   console.log(product);
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "50%", position: "relative" }}>
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "10%",
            left: 0,
            top: 0,
            opacity: 0.8,
            backgroundColor: "gray",
            zIndex: 20,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Appbar.Header style={{ height: 60 }} statusBarHeight={0}>
            <View style={styles.headerContent}>
              <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
              <Appbar.Content title="Chọn sản phẩm" style={styles.title} />
            </View>
          </Appbar.Header>
        </View>
        <Image
          style={{ width: "100%", height: "100%", zIndex: 10 }}
          source={{
            uri: product?.thumbnailImage,
          }}
        />
      </View>
      <View style={{ width: "100%", height: "50%", position: "relative" }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 10,
            paddingLeft: 10,
          }}
        >
          {product?.name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#363636",
            fontWeight: "bold",
            marginTop: 10,
            paddingLeft: 10,
          }}
        >
          {convertVND(product?.price)} -{" "}
          <Text
            style={{ textDecorationLine: "line-through", color: "#ababab" }}
          >
            {convertVND(product?.price * 2)}
          </Text>
        </Text>

        <Text
          style={{
            fontSize: 18,
            marginTop: 30,
            fontWeight: "bold",
            paddingLeft: 10,
          }}
        >
          Description
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#9b9b9b",
            paddingLeft: 10,
          }}
        >
          {product?.description}
        </Text>

        {/* btn */}
        <TouchableOpacity
          style={{
            position: "absolute",
            width: "100%",
            height: 50,
            backgroundColor: "#f68308",
            top: "100%",
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleOrder}
        >
          <Text style={{ color: "#ffffff", fontSize: 30 }}>
            Liên hệ đặt may
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
