import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Image, ScrollView, StyleSheet, View, Dimensions, RefreshControl } from "react-native";

// import LinearGradient from 'react-native-linear-gradient';
import {
  Appbar,
  Card,
  Text,
  ActivityIndicator,
  SegmentedButtons,
  Badge,
  ProgressBar
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Realtime } from "./Realtime";
import { Notifier, Easing } from 'react-native-notifier';

function getHoursDifference(deadline) {
  const currentDateUTC = new Date();

  const startMillis = new Date(deadline).getTime();
  const currentMillisUTC7 = currentDateUTC.getTime();

  const millisDiff = startMillis - currentMillisUTC7;
  const hoursDiff = millisDiff / (1000 * 60 * 60);

  return hoursDiff < 0 ? "Quá hạn" : hoursDiff < 24 ? `${Math.floor(hoursDiff)} giờ ` : `${Math.floor(hoursDiff / 24)} ngày`;
}

const CustomTabIcon = ({ name, onPress, status }) => {
  let iconColor = "";



  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={name} size={30} color={"#9F78FF"} />
    </TouchableOpacity>
  );
};

export default function StaffTask({ navigation }) {
  const [staffInfo, setStaffInfo] = React.useState("");
  const realTimeMessage = Realtime()

  const [loading, setLoading] = useState(false);

  const [dataTask, setDataTask] = useState(null);

  const [value, setValue] = useState("all");
  const [allTask, setAllTask] = useState(0);
  const [notStartTask, setNotStartTask] = useState(0);
  const [onGoingTask, setOnGoingTask] = useState(0);
  const [finishedTask, setFinishedTask] = useState(0);
  const [taskByStatus, setTaskByStatus] = useState([]);
  const [notification, setNotification] = useState([]);
  // Get Staff Info
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

  // get notification realtime
  React.useEffect(() => {
    if (realTimeMessage) {
      Notifier.showNotification({
        title: 'Bạn có thông báo mới',
        duration: 0,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        onHidden: () => console.log('Hidden'),
        onPress: () => console.log('Press'),
        hideOnPress: false,
      });

      fetchStaffNotification()
    }
  }, [realTimeMessage])
  // Fetch notification
  const fetchStaffNotification = async () => {
    const URL = `https://e-tailorapi.azurewebsites.net/api/notification/get-notification`
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${staffInfo.token}`
      }
    });
    if (response.ok && response.status === 200) {
      const responseData = await response.json();
      setNotification(responseData);
    }

  }

  const currentDate = new Date().toLocaleDateString("vi", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDate = currentDate.replace(",", "");


  const [refreshing, setRefreshing] = useState(false);



  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  //Fetch task data
  React.useEffect(() => {
    const fetchDataTask = async () => {
      if (staffInfo !== null) {
        setLoading(true);
        try {
          const taskUrl =
            "https://e-tailorapi.azurewebsites.net/api/task/staff/get-all";
          const response = await fetch(taskUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${staffInfo.token}`,
            },
          });
          if (response.ok && response.status === 200) {
            const responseData = await response.json();
            setDataTask(responseData);
            const allTask = responseData.length;
            const notStartTask = responseData.filter((task) => task.status === 1)
            const onGoingTask = responseData.filter((task) => task.status === 2)
            const finishedTask = responseData.filter((task) => task.status === 3)
            setAllTask(allTask);
            setNotStartTask(notStartTask.length);
            setOnGoingTask(onGoingTask.length);
            setFinishedTask(finishedTask.length);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.error("Error calling API:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDataTask();
    fetchStaffNotification();
  }, [staffInfo]);
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({ item }) => {
    if (
      value === "all" ||
      (value === "not-start" && item.status === 1) ||
      (value === "on-going" && item.status === 2)
    ) {
      return (
        <>

          <View
            style={{
              backgroundColor: "#fff",
              marginVertical: 10,
              width: "90%",
              alignSelf: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#9F78FF",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Staff-Task-Detail", {
                  id: item.id,
                  staffInfo: staffInfo,
                })
              }
            >
              <Card.Title
                title={item.name}
                subtitle={<Text style={{ color: "#9F78FF" }}>Thời hạn: {item?.plannedTime ? getHoursDifference(item.plannedTime) : "Không có thời hạn"} </Text>}
                left={(props) => (
                  <View
                    style={{
                      backgroundColor: "#9F78FF",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 45,
                      height: 45,
                      borderRadius: 10,
                    }}
                  >
                    <Icon
                      name="receipt-outline"
                      onPress={() => setSelectedId(item.id)}
                      size={30}
                      style={{ color: "white" }}
                    />
                  </View>
                )}
                right={(props) => {
                  switch (item.status) {
                    case 1:
                      return (
                        <View style={{ display: "flex", flexDirection: "column", paddingRight: 10 }}>

                          <View>
                            <CustomTabIcon
                              name={"arrow-forward-outline"}
                              onPress={() => setSelectedId(item.id)}
                              status={item.status}
                            />
                          </View>
                        </View>

                      );
                    case 2:
                      return (
                        <View
                          style={{
                            marginRight: 10,
                            padding: 5,
                            borderRadius: 10,
                          }}
                        >
                          <ProgressBar progress={0.5} style={{ width: 70 }} />
                          <Text style={{ textAlign: 'center', color: '#9F78FF', marginTop: 5, }}>Tiến hành</Text>

                        </View>
                      );
                    case 4:
                      return (
                        <View
                          style={{
                            marginRight: 10,
                            padding: 5,
                            borderRadius: 10,
                          }}
                        >
                          <ProgressBar progress={0.5} style={{ width: 70, color: "green" }} />
                          <Text style={{ textAlign: 'center', color: '#9F78FF', marginTop: 5 }}>Hoàn thành</Text>

                        </View>
                      )
                    case 5:
                      return (

                        <View
                          style={{
                            marginRight: 10,
                            padding: 5,
                            borderRadius: 10,
                          }}
                        >
                          <ProgressBar progress={1} style={{ width: 70 }} />
                          <Text style={{ textAlign: 'center', color: '#9F78FF', marginTop: 5 }}>Hoàn thành</Text>

                        </View>
                      )
                  }
                }}
              />
            </TouchableOpacity >
          </View >
        </>
      );
    } else {
      return null;
    }
  };

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);
  const notifierRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  // const _handleNotificationPress = () => {
  //   console.log("Notification")
  //   navigation.navigate("Staff-Notification", { notification: notification });
  // }
  return (
    <>
      <Appbar.Header mode="small" style={{
        backgroundColor: "#865abb",
      }} statusBarHeight={0}>
        <Appbar.Content style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}
          title={
            <>
              <View style={{ marginLeft: 10 }}>
                <Icon name="menu-outline" size={30} color="#fff" />
              </View>
              <View>
                <Text style={{ color: "#fff", fontSize: 20 }}>E-tailor</Text>
              </View>
              <View style={{ position: 'relative', marginRight: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Staff-Notification", { notification: notification })}>
                  <Icon name="notifications-circle" size={40} color="#fff" />
                  {
                    notification && notification.unread !== undefined && notification.unread > 0 &&
                    <Badge style={{ position: 'absolute', top: 0, right: 0 }} size={20}>
                      {notification.unread}
                    </Badge>
                  }
                </TouchableOpacity>
              </View>

            </>
          }
        />

      </Appbar.Header >
      < View style={{ position: "relative", height: 70, backgroundColor: "#865abb" }
      }>

        < View style={{ position: "absolute", bottom: -40, left: 0, right: 0, justifyContent: "center", alignItems: "center" }}>

          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff", zIndex: 10, width: 350, borderTopRightRadius: 10, borderTopLeftRadius: 10, height: 100 }}>

            <Text style={{ marginLeft: 10, color: "#865abb", fontSize: 18, marginBottom: 2, fontWeight: "bold" }}>
              Xin chào,{" "}
              <Text style={{ fontWeight: "bold", color: "#865abb" }}>
                {staffInfo ? staffInfo.name : ""}
              </Text>
            </Text>
            <Text>
              Bạn có <Text style={{ fontWeight: "bold" }}>{allTask}</Text> công việc chưa hoàn thành
            </Text>
          </View>


        </View >
        {/* <View style={{ width: 500, height: 200 }}>
          <Image source={require('../../assets/images/7172318.jpg')} style={{ width: 500, height: 200, resizeMode: "contain" }} />
        </View > */}
      </View >
      {
        !loading ? (
          <View style={{ marginTop: 10, marginBottom: 40 }}>
            <View>
              <SafeAreaView
                style={{ alignItems: "center", margin: 20 }}
              >
                <SegmentedButtons
                  value={value}
                  style={{ paddingTop: 30 }}
                  onValueChange={setValue}
                  buttons={[
                    {
                      value: "all",
                      label: "Tất cả",
                    },
                    {
                      value: "not-start",
                      label: "Chưa bắt đầu",
                    },
                    { value: "on-going", label: "Đang xử lý" },
                  ]}
                />
              </SafeAreaView>
            </View>
            <FlatList
              data={dataTask}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
              scrollEnabled={true}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        ) : (
          <View
            style={{ flex: 0.8, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator animating={true} color={"#9F78FF"} />
          </View>
        )
      }

    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "auto",
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "white",
  },
});
