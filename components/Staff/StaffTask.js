import * as React from "react";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Appbar, Banner, Avatar, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

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
export default function StaffTask() {
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
    let borderColor;
    switch (item.status) {
      case 1:
        borderColor = "green";
        break;
      case 2:
        borderColor = "red";
        break;
      case 3:
        borderColor = "yellow";
        break;
      default:
        borderColor = "none";
        break;
    }

    return (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 30,
          minHeight: 100,
          backgroundColor: "#fff",
          marginHorizontal: 30,
          marginVertical: 10,
          borderRadius: 14,
          borderWidth: 2,
          borderColor: borderColor,
        }}
      >
        <Item item={item} onPress={() => setSelectedId(item.id)} />
      </View>
    );
  };
  return (
    <>
      <Appbar.Header mode="small">
        <Appbar.Content
          title={
            <>
              <Text style={{ marginLeft: 10, fontSize: 18 }}>
                Xin chào,{" "}
                <Text style={{ fontWeight: "bold", color: "#9572f3" }}>
                  {staffInfo ? staffInfo.name : ""}
                </Text>
              </Text>
              {formattedDate ? (
                <Text
                  style={{ marginLeft: 10, fontSize: 14, fontWeight: "300" }}
                >
                  {formattedDate}
                </Text>
              ) : (
                ""
              )}
            </>
          }
        />
        <Avatar.Image
          size={40}
          style={{ marginRight: 20 }}
          source={{ uri: staffInfo?.avatar }}
        />
      </Appbar.Header>

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
            Tất cả &nbsp;
            <Text
              styles={{
                backgroundColor: "#585457",
                minHeight: 10,
                minWidht: 10,
              }}
            >
              3
            </Text>
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
            Chưa hoàn thành
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
            Hoàn thành
          </Button>
        </View>
      </View>
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
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "white",
    color: "#9572f3",
    borderRadius: 10,
  },
});
