import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Text, Button } from 'react-native-paper'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { ScrollView } from 'react-native-gesture-handler';

const getStatusTextAndColor = (status) => {
  let color;
  let text;
  switch (status) {
    case 0:
      color = "red";
      textColor = "white";
      iconName = "close-outline";
      borderColor = "red";
      text = "Đã huỷ";
    case 1:
      color = "#49449c";
      textColor = "white"
      iconName = "ellipse-outline";
      borderColor = "red";
      text = "Bắt đầu";
      break;
    case 2:
      color = "#d9467a";
      textColor = "white"
      iconName = "ellipse-outline";
      borderColor = "red";
      text = "Đang tiến hành";
      break;
    case 3:
      color = "#fbc833";
      textColor = "white"
      iconName = "ellipse-outline";
      borderColor = "red";
      text = "Dừng";
      break;
    case 4:
      color = "#78c419";
      textColor = "white"
      iconName = "checkmark-outline";
      borderColor = "red";
      text = "Hoàn thành";
      break;
  }
  return { color, text, iconName, textColor };
};
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const StepStageView = ({ stageData, taskId, fetchDataTask }) => {

  const sheetRef = useRef(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [staffInfo, setStaffInfo] = useState(null);
  React.useEffect(() => {
    const retrieveStaffItem = async () => {
      AsyncStorage.getItem("staff")
        .then((user) => {
          setStaffInfo(JSON.parse(user));
        })
        .catch((error) => {
          console.error("Error retrieving staff data:", error);
        });
    };
    retrieveStaffItem();
  }, []);
  // variables
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['95%', '80%'], []);

  // callbacks
  const handlePresentModalPress = useCallback((stage) => {
    bottomSheetModalRef.current?.present(stage);
    setSelectedStage(stage);
  }, []);


  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  //----------------------------------------------------------------completed tasks--------------------------------------
  const [openCheckTask, setOpenCheckTask] = useState(false);

  const [images, setImages] = useState([]);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const handleTaskStart = async (taskId, stageId) => {
    console.log("taskID", taskId, "stageID", stageId)
    setApiLoading(true);
    const url = `https://e-tailorapi.azurewebsites.net/api/task/staff/${taskId}/start/${stageId}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${staffInfo?.token}`,
        },
      });
      if (response.ok && response.status === 200) {
        console.log("response", response)
        setApiLoading(false);
        fetchDataTask();
      } else if (response.status === 400 || response.status === 500) {
        console.log("FAIL:", response)
        setApiLoading(false);
        const responseData = await response.text();
        // Alert.alert("Lỗi", responseData);
      } else if (response.status === 401) {
        navigation.navigate("Staff-Login");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
  const handleTaskPending = async (taskId, stageId) => {
    setApiLoading(true);
    const url = `https://e-tailorapi.azurewebsites.net/api/task/staff/${taskId}/pending/${stageId}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${staffInfo?.token}`,
        },
      });
      if (response.ok && response.status === 200) {
        setApiLoading(false);
        fetchDataTask();
      } else if (response.status === 400 || response.status === 500) {
        const responseData = await response.text();
        // Alert.alert("Lỗi", responseData);
        setApiLoading(false);
      } else if (response.status === 401) {
        navigation.navigate("Staff-Login");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
  const handleTaskFinish = async (taskId, stageId) => {
    const url = `https://e-tailorapi.azurewebsites.net/api/task/staff/${taskId}/finish/${stageId}`;
    const formData = new FormData();

    images.forEach((images, index) => {
      formData.append(`images[${index}]`, {
        uri: images,
        type: "image/jpeg",
        name: `image${index}.jpg`,
      });
    });

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${staffInfo?.token}`,
        },
        body: formData,
      });
      if (response.ok && response.status === 200) {
        setOpenCheckTask(false);
        setImages([]);
        fetchDataTask();
      } else if (response.status === 400 || response.status === 500) {
        const responseData = await response.text();
        Alert.alert("Lỗi", responseData);
      } else if (response.status === 401) {
        navigation.navigate("Staff-Login");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
  return (
    <BottomSheetModalProvider>
      {stageData && stageData.map((stage, index) => (
        <View key={index} style={{ marginTop: 12, height: 60, paddingHorizontal: 24 }}>
          <TouchableOpacity onPress={() => handlePresentModalPress(stage)} style={{ paddingHorizontal: 14, borderWidth: 0.3, borderRadius: 8, height: "100%", backgroundColor: `${getStatusTextAndColor(stage.status).color}`, borderColor: "black", overflow: "hidden" }}>
            <View style={{ flexDirection: "row", alignItems: "center", height: "100%" }}>
              <Icon name='ellipse-outline' size={20} color={getStatusTextAndColor(stage.status).textColor} />
              <View style={{ width: "80%", }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    fontWeight: "bold",
                    paddingHorizontal: 20,

                    justifyContent: "center"
                  }}>
                  Công đoạn {stage.stageNum}: {stage?.stageName}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#fff",
                    paddingHorizontal: 20,
                    width: "80%",
                    justifyContent: "center"
                  }}>
                  Trạng thái: {getStatusTextAndColor(stage.status).text}
                </Text>
              </View>

              <Icon name='chevron-forward-outline' size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

      ))
      }
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          enableTouchThrough={true}
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          index={0}
          snapPoints={snapPoints}
          detached={true}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => bottomSheetModalRef.current?.close()}
            >
              <Icon name='close-outline' size={30} />
            </TouchableOpacity>
            <ScrollView>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Thông tin công đoạn</Text>
              </View>
              {selectedStage?.productComponents.map((component, index) => (
                <View key={index} style={{ marginTop: 10 }}>
                  <Text variant='titleMedium'>{index + 1}/ {component.name}</Text>
                  <View style={{ marginHorizontal: 15 }}>
                    <Image
                      source={{
                        uri: component?.component.image,
                      }}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 10,
                        // Add border to see if image container is visible
                        borderWidth: 1,
                        marginVertical: 12,

                      }}
                      resizeMode="contain"
                    />
                    <Text variant='bodyMedium'>
                      Ghi chú của khách: &nbsp;
                      {component?.note ? component?.note : "Không có ghi chú"}

                    </Text>
                  </View>

                </View>

              ))}
              <View>
                {selectedStage?.status === 1 && (
                  <Button
                    icon={() => (
                      <Icon
                        name="flag"
                        size={20}
                        color="rgb(63, 155, 158)"
                      />
                    )}
                    textColor="rgb(63, 155, 158)"
                    onPress={() =>
                      handleTaskStart(
                        taskId,
                        selectedStage?.id
                      )
                    }
                    style={{
                      width: "100%",
                      marginTop: 25,
                      alignSelf: "center",
                      backgroundColor:
                        "rgba(113, 240, 245, 0.6)",
                      color: "rgb(63, 155, 158)",
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: "rgb(63, 155, 158)",
                    }}
                  >
                    Bắt đầu {apiLoading && <ActivityIndicator animating={apiLoading} style={{ paddingLeft: 10 }} size="small" color="black" />}
                  </Button>

                )}
                {selectedStage?.status === 2 && (
                  <Button
                    icon={() => (
                      <Icon
                        name="alert-circle-outline"
                        size={20}
                        color="rgb(194, 44, 41)"
                      />
                    )}
                    textColor="rgb(194, 44, 41)"
                    onPress={() =>
                      handleTaskPending(
                        taskId,
                        selectedStage?.id
                      )
                    }
                    style={{
                      width: "100%",
                      marginTop: 25,
                      alignSelf: "center",
                      backgroundColor:
                        "rgba(194, 44, 41, 0.4)",
                      color: "rgb(194, 44, 41)",
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: "rgb(194, 44, 41)",
                    }}
                  >
                    Tạm dừng
                  </Button>
                )}

                {selectedStage?.status === 3 && (
                  <Button
                    icon={() => (
                      <Icon
                        name="caret-forward-circle-outline"
                        size={20}
                        color="rgb(171, 167, 43)"
                      />
                    )}
                    textColor="rgb(171, 167, 43)"
                    onPress={() =>
                      handleTaskStart(
                        taskId,
                        selectedStage?.id
                      )
                    }
                    style={{
                      width: "100%",
                      marginTop: 25,
                      alignSelf: "center",
                      backgroundColor:
                        "rgba(171, 167, 43, 0.4)",
                      color: "rgb(171, 167, 43)",
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: "rgb(171, 167, 43)",
                    }}
                  >
                    Tiếp tục
                  </Button>
                )}
              </View>
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'start',
    height: HEIGHT,
    padding: 24,
    marginBottom: 100, // Add padding top to prevent overlapping with the close button
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default StepStageView;
