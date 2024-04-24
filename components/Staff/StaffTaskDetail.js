import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
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
const Height = Dimensions.get('window').height;
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
  // const [expanded, setExpanded] = React.useState(true);

  // const handlePress = () => setExpanded(!expanded);
  // const BodySizesView = ({ item }) => (

  //   <List.Section title="Accordions">
  //     <List.Accordion
  //       title={
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             justifyContent: "space-between",
  //             alignItems: "center",
  //           }}
  //         >
  //           <Text
  //             variant="titleLarge"
  //             style={{
  //               marginLeft: 15,
  //               fontWeight: "bold",
  //             }}
  //           >
  //             Số đo
  //           </Text>
  //         </View>
  //       }
  //       left={props => <List.Icon {...props} icon="folder" />}
  //       expanded={expanded}
  //       onPress={handlePress}>
  //       <View>
  //         {item && item.map((item) => {
  //           console.log("item", item)
  //           return (
  //             <List.Item title={item.bodySize.name + ": " + item.bodySize.value} />
  //           )
  //         })}
  //       </View>

  //     </List.Accordion>
  //   </List.Section>
  // <View
  //   style={{
  //     width: "50%",
  //     height: 50,
  //     marginTop: 10,
  //     padding: 10,
  //   }}
  // >
  //   <Text
  //     style={{
  //       alignItems: "center",
  //       textAlign: "center",
  //       textAlignVertical: "center",
  //       borderRadius: 10,
  //       backgroundColor: "white",
  //       width: "100%",
  //       height: 50,
  //       shadowColor: "#9F78FF",
  //       shadowOffset: {
  //         width: 0,
  //         height: 0,
  //       },
  //       shadowOpacity: 10,
  //       shadowRadius: 3,
  //       elevation: 10,
  //     }}
  //   >
  //     {item.bodySize.name}: {item.value}
  //   </Text>
  // </View>
  //);

  const ItemUpload = ({ image }) => {

    return (
      <View>
        <Icon
          name="close-circle-outline"
          size={30}
          style={{
            color: "rgb(48, 176, 166)",
            marginLeft: 10,
            position: "absolute",
            right: 20,
            top: 10,
            zIndex: 1000,
          }}
          onPress={() => {
            const filteredImages = images?.filter((img) => img !== image);
            setImages(filteredImages);
          }}
        />
        <Image
          source={{ uri: image }}
          style={{
            width: 140,
            height: 140,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#9F78FF",
            margin: "3%",
          }}
        />
      </View>
    );
  };



  return (
    <>

      <Appbar.Header style={{ height: 40 }} statusBarHeight={0}>
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
                    width: 200,
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
                  <StepStageView stageData={dataTaskDetail?.productStages} taskId={dataTaskDetail?.id}  fetchDataTask={fetchDataTask}/>
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
