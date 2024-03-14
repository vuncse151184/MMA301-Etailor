import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const ProductDetail = ({ navigation, route }) => {
  const { product } = route.params;

  const back = () => {
    navigation.navigate("Sample-products", {});
  };

  const handleOrder = () => {};
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
          <TouchableOpacity onPress={back}>
            <Text
              style={{
                fontSize: 20,
                marginTop: 5,
                color: "#ffffff",
                marginLeft: 5,
              }}
            >
              Trở lại
            </Text>
          </TouchableOpacity>
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
    width: "100%",
    backgroundColor: "#ffffff",
    minHeight: "100%",
    paddingBottom: 50,
    paddingTop: 10,
  },
});
