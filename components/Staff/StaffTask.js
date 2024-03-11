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
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Tay áo sơ mi",
    dueDate: "24/1/2024",
    status: 1,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Ống quần tây",
    dueDate: "24/1/2024",
    status: 2,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Cắt vải",
    dueDate: "24/1/2024",
    status: 3,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "Cắt vải",
    dueDate: "24/1/2024",
    status: 4,
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <View>
        <Text style={{ color: textColor, fontSize: 30, fontWeight: "bold" }}>
          {item.title}
        </Text>
        <View
          style={{
            backgroundColor: "#F7F7FA",
            width: 200,
            minHeight: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/images/reminder.png")}
          />
          <Text style={{ fontSize: 18, color: "#AEB0C6", marginLeft: 10 }}>
            {item.dueDate}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {item.status === 1 && (
          <Image
            style={{ marginLeft: 40 }}
            source={require("../../assets/images/check.png")}
          />
        )}
        {item.status === 2 && (
          <Image
            style={{ marginLeft: 40 }}
            source={require("../../assets/images/due-date.png")}
          />
        )}
        {item.status === 3 && (
          <Image
            style={{ marginLeft: 40 }}
            source={require("../../assets/images/circular.png")}
          />
        )}
      </View>
    </View>
  </TouchableOpacity>
);
export default function StaffTask({ navigation }) {
  const [staffInfo, setStaffInfo] = React.useState("");
  const [selectedButton, setSelectedButton] = useState("all");
  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };
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

  const [selectedId, setSelectedId] = useState();

  const renderItem = ({ item }) => {
    return (
      <>
        <View
          style={{
            backgroundColor: "white",
            marginVertical: 10,
            width: 390,
            alignSelf: "center",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#9F78FF",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Staff-Task-Detail")}
          >
            <Card.Title
              title={item.title}
              subtitle={`Thời hạn: ${item.dueDate}`}
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
                      <Chip
                        icon={() => (
                          <CustomTabIcon
                            name={"sync-circle-outline"}
                            onPress={() => setSelectedId(item.id)}
                            status={item.status}
                          />
                        )}
                        style={{
                          marginRight: 10,
                          backgroundColor: "rgba(25, 224, 208, 0.5)",
                        }}
                        textStyle={{
                          color: "rgb(48, 176, 166)",
                          fontWeight: "bold",
                        }}
                      >
                        Chưa bắt đầu
                      </Chip>
                    );
                  case 2:
                    return (
                      <Chip
                        icon={() => (
                          <CustomTabIcon
                            name={"ellipsis-horizontal-outline"}
                            onPress={() => setSelectedId(item.id)}
                            status={item.status}
                          />
                        )}
                        style={{
                          marginRight: 10,
                          backgroundColor: "rgba(242, 235, 34, 0.5)",
                        }}
                        textStyle={{
                          color: "rgb(171, 167, 43)",
                          fontWeight: "bold",
                        }}
                      >
                        Trong quá trình
                      </Chip>
                    );
                  case 3:
                    return (
                      <Chip
                        icon={() => (
                          <CustomTabIcon
                            name={"stop-outline"}
                            onPress={() => setSelectedId(item.id)}
                            status={item.status}
                          />
                        )}
                        style={{
                          marginRight: 10,
                          backgroundColor: "rgba(252, 49, 45, 0.5)",
                        }}
                        textStyle={{
                          color: "rgb(194, 44, 41)",
                          fontWeight: "bold",
                        }}
                      >
                        Tạm dừng
                      </Chip>
                    );
                  case 4:
                    return (
                      <Chip
                        icon={() => (
                          <CustomTabIcon
                            name={"checkmark-outline"}
                            onPress={() => setSelectedId(item.id)}
                            status={item.status}
                          />
                        )}
                        style={{
                          marginRight: 10,
                          backgroundColor: "rgba(34, 240, 85, 0.5)",
                        }}
                        textStyle={{ color: "rgb(44, 176, 77)" }}
                      >
                        Hoàn thành
                      </Chip>
                    );
                }
              }}
            />
          </TouchableOpacity>
        </View>
      </>
    );
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
              <Text style={{ marginLeft: 10, fontSize: 15, marginBottom: 2 }}>
                Role: &nbsp;
                <Text style={{ fontWeight: "bold", color: "#9572f3" }}>
                  {staffInfo.role}
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
        <Avatar.Image
          size={40}
          style={{ marginRight: 30, marginBottom: 30 }}
          source={{ uri: staffInfo?.avatar }}
        />
      </Appbar.Header>
      <Text variant="titleLarge" style={{ marginLeft: 10, marginTop: 20 }}>
        Công việc:
      </Text>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            labelStyle={{
              color: selectedButton === "all" ? "white" : "#9572f3",
            }}
            style={[
              styles.button,
              selectedButton === "all" && {
                backgroundColor: "#9572f3",
                color: "white",
              },
            ]}
            onPress={() => handleButtonPress("all")}
          >
            Tất cả&nbsp;
          </Button>
          <Button
            mode="contained"
            labelStyle={{
              color: selectedButton === "incomplete" ? "white" : "#9572f3",
            }}
            style={[
              styles.button,
              selectedButton === "incomplete" && {
                backgroundColor: "#9572f3",
                color: "white",
              },
            ]}
            onPress={() => handleButtonPress("incomplete")}
          >
            Chưa hoàn thành{" "}
          </Button>
          <Button
            mode="contained"
            labelStyle={{
              color: selectedButton === "completed" ? "white" : "#9572f3",
            }}
            style={[
              styles.button,
              selectedButton === "completed" && {
                backgroundColor: "#9572f3",
                color: "white",
              },
            ]}
            onPress={() => handleButtonPress("completed")}
          >
            Hoàn thành{" "}
          </Button>
        </View>
      </View>
      <Text variant="titleLarge" style={{ marginLeft: 10 }}>
        Mới cập nhật:
      </Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "white",
    color: "#9572f3",
    borderRadius: 10,
  },
});
