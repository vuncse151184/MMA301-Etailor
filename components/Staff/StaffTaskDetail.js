import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Platform,
  Dimensions
} from "react-native";
import Modal from "react-native-modal";
import React, { useEffect, useMemo, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Appbar,
  ActivityIndicator,
  Text,
} from "react-native-paper";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import BodySizesView from "./BodySizesView";
import StepStageView from "./StepStageView";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const StaffTaskDetail = ({ navigation, route, }) => {
  const { id, staffInfo } = route.params;
  const [loading, setLoading] = useState(false);
  const [dataTaskDetail, setDataTaskDetail] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchDataTask = async () => {
    if (staffInfo !== null) {
      setLoading(true);
      try {
        const taskUrl = `https://e-tailorapi.azurewebsites.net/api/task/${id}`;
        const response = await fetch(taskUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${staffInfo.token}`,
          },
        });
        if (response.ok && response.status === 200) {
          const responseData = await response.json();
          console.log("pop up",responseData);
          setDataTaskDetail(responseData);
        }
      } catch (error) {
        console.error("Error calling API:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    fetchDataTask();
  }, []);



  const _goBack = () => navigation.navigate("Staff-Tasks");

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const [startWork, setStartWork] = useState(0);
  return (
    <>

      <Appbar.Header style={{ height: HEIGHT*0.05 }} statusBarHeight={0}>
        <View style={styles.headerContent}>
          <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
          <Appbar.Content
            title="Chi tiết công việc"
            titleStyle={styles.title}
          />
        </View>
      </Appbar.Header>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator animating={true} color={"#9F78FF"} />
        </View>
      ) : (

        <>
          <View style={{ backgroundColor: "white", flex: 1, paddingTop: 10, position: "relative" }}>
            <ScrollView>
              <Text
                variant="titleLarge"
                style={{
                  marginTop: 10,
                  marginLeft: 15,
                  fontWeight: "bold",
                }}
              >
                {dataTaskDetail?.name}
              </Text>

              <Text
                variant="titleMedium"
                style={{
                  marginTop: 10,
                  marginLeft: 15,
                  fontWeight: "bold",
                }}
              >
                Mã đơn: {dataTaskDetail?.orderId}
              </Text>
              <View>
                <Text
                  variant="titleMedium"
                  style={{ marginTop: 10, marginLeft: 15 }}
                >
                  Loại bản mẫu: {dataTaskDetail?.productTemplate?.name}
                  {/* <Text variant="bodySmall"></Text> */}
                </Text>
                <Image
                  source={{
                    uri: dataTaskDetail?.productTemplate?.thumbnailImage,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                  resizeMode="contain"
                />
                <Text
                  variant="titleMedium"
                  style={{ marginTop: 16, marginLeft: 15 }}
                >
                  Ghi chú:{" "}
                  {dataTaskDetail?.note === ""
                    ? "Không có ghi chú"
                    : dataTaskDetail?.note}
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginTop: 16,
                    marginLeft: 15,
                  }}
                >
                  Vải sử dụng: {dataTaskDetail?.fabricMaterial?.name}
                </Text>
               
                <View>
                  <BodySizesView item={dataTaskDetail?.productBodySizes} />
                </View>
                <Text
                  variant="titleMedium"
                  style={{
                    marginTop: 16,
                    marginLeft: 15,
                  }}
                >
                  Công đoạn:
                </Text>
                <View style={styles.bottomSheetContainer}>
                  <StepStageView stageData={dataTaskDetail?.productStages} taskId={dataTaskDetail?.id} fetchDataTask={fetchDataTask} />
                </View>
              </View>


            </ScrollView>

          </View >

        </>
      )}
    </>
  );
};

export default StaffTaskDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: "#fff",
    elevation: 0,
  },
  inputWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  bottomSheetContainer: {
    flex: 1,
    marginTop: 16,
    width: "100%",

  },
  input: {
    width: 350,
    borderWidth: 5,
    borderColor: "#9f78ff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardImg: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
    paddingTop: 0,
  },
  cardContent: {
    width: 380,
    marginTop: 20,
    height: 170,
    textAlign: "center",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 10 : 0,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#9f78ff",
  },
  cardTitle: {
    fontWeight: "bold",
    color: "#9f78ff",
  },
  cardParagraph: {
    fontSize: 14,
    width: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  title: {
    flex: 1,
    textAlign: "center",
    marginRight: 25,
    marginTop: 5,
  },
});
