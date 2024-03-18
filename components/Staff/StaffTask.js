import * as React from "react";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import {
  Appbar,
  Banner,
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
  Chip,
  ActivityIndicator,
  SegmentedButtons,
  Drawer,
  Portal,
  Dialog,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

const CustomTabIcon = ({ name, onPress, status }) => {
  let iconColor = "";

  switch (status) {
    case 1:
      iconColor = "rgb(48, 176, 166)";
      break;
    case 2:
      iconColor = "rgb(171, 167, 43)";
      break;
    case 3:
      iconColor = "rgb(194, 44, 41)";
      break;
    case 4:
      iconColor = "rgb(44, 176, 77)";
      break;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={name} size={30} color={iconColor} />
    </TouchableOpacity>
  );
};

export default function StaffTask({ navigation }) {
  const [staffInfo, setStaffInfo] = React.useState("");

  const [loading, setLoading] = useState(false);

  const [dataTask, setDataTask] = useState(null);

  const [value, setValue] = useState("all");

  const currentDate = new Date().toLocaleDateString("vi", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDate = currentDate.replace(",", "");

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
          }
        } catch (error) {
          console.error("Error calling API:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDataTask();
  }, [staffInfo]);

  const [selectedId, setSelectedId] = useState();

  const [active, setActive] = React.useState("");

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
              backgroundColor: "white",
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
                subtitle={`Thời hạn: ${item.deadline}`}
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
                        <View
                          style={{
                            marginRight: 10,
                            backgroundColor: "rgba(25, 224, 208, 0.5)",
                            padding: 5,
                            borderRadius: 10,
                          }}
                        >
                          <CustomTabIcon
                            name={"sync-circle-outline"}
                            onPress={() => setSelectedId(item.id)}
                            status={item.status}
                          />
                        </View>
                      );
                    case 2:
                      return (
                        <View
                          style={{
                            marginRight: 10,
                            backgroundColor: "rgba(242, 235, 34, 0.5)",
                            padding: 5,
                            borderRadius: 10,
                          }}
                        >
                          <CustomTabIcon
                            name={"ellipsis-horizontal-outline"}
                            onPress={() => setSelectedId(item.id)}
                            status={item.status}
                          />
                        </View>
                      );
                  }
                }}
              />
            </TouchableOpacity>
          </View>
        </>
      );
    } else {
      return null;
    }
  };

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("staff");
      navigation.navigate("Staff-Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Appbar.Header mode="small">
        <Appbar.Content
          title={
            <>
              <Text style={{ marginLeft: 10, fontSize: 18, marginBottom: 2 }}>
                Xin chào,{" "}
                <Text style={{ fontWeight: "bold", color: "#9572f3" }}>
                  {staffInfo ? staffInfo.name : ""}
                </Text>
              </Text>
              {formattedDate ? (
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: "300",
                    marginBottom: 30,
                  }}
                >
                  Ngày: {formattedDate}
                </Text>
              ) : (
                ""
              )}
            </>
          }
        />
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Avatar.Image
            size={40}
            style={{ marginRight: 30, marginBottom: 30 }}
            source={{ uri: staffInfo?.avatar }}
          />
        </TouchableOpacity>
      </Appbar.Header>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Icon icon="logout" />
          <Dialog.Title style={{ textAlign: "center" }}>Logout</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={() => logout()}>Accept</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Text variant="titleLarge" style={{ marginLeft: 10, marginTop: 20 }}>
        Công việc:
      </Text>
      <View>
        <SafeAreaView
          style={{ alignItems: "center", marginTop: 5, marginBottom: 5 }}
        >
          <SegmentedButtons
            value={value}
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
              { value: "on-going", label: "Trong quá trình" },
            ]}
          />
        </SafeAreaView>
      </View>
      <Text variant="titleLarge" style={{ marginLeft: 10 }}>
        Mới cập nhật:
      </Text>
      {!loading ? (
        <FlatList
          data={dataTask}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator animating={true} color={"#9F78FF"} />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "auto",
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
});
