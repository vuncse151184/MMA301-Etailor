import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
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
  Divider,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

export default function StaffProfile({ navigation }) {
  const [staffInfo, setStaffInfo] = React.useState("");
  const _goBack = () => navigation.navigate("Staff-Tasks");
  const [categoryData, setCategoryData] = useState([]);
  const getCategoryName = (id) => {
    const category = categoryData.find((item) => item.id === id);
    return category?.name;
  }
  const [loading, setLoading] = useState(false);
  const [dataStaff, setDataStaff] = useState(null);
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
    const fetchCategory = async () => {
      if (staffInfo !== null) {
        setLoading(true);
        try {
          const categoryUrl =
            "https://e-tailorapi.azurewebsites.net/api/category-management";
          const response = await fetch(categoryUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${staffInfo.token}`,
            },
          });
          if (response.ok && response.status === 200) {
            const responseData = await response.json();
            setCategoryData(responseData);
          }
        } catch (error) {
          console.error("Error calling API:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchCategory();
    const fetchDataTask = async () => {
      if (staffInfo !== null) {
        setLoading(true);
        try {
          const taskUrl =
            "https://e-tailorapi.azurewebsites.net/api/staff/info";
          const response = await fetch(taskUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${staffInfo.token}`,
            },
          });
          if (response.ok && response.status === 200) {
            const responseData = await response.json();
            setDataStaff(responseData);
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
  console.log("data staff ma: ", dataStaff);
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
      <Appbar.Header style={{ height: 40 }} statusBarHeight={0}>
        <View style={styles.headerContent}>
          <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
          <Appbar.Content title="Nhân viên" titleStyle={styles.title} />
        </View>
      </Appbar.Header>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator animating={true} color={"#9F78FF"} />
        </View>
      ) : (
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <View style={{ alignSelf: "center", marginTop: 50 }}>
            <Avatar.Image size={120} source={{ uri: dataStaff?.avatar }} />
          </View>
          <View style={{ marginTop: 50, padding: 30 }}>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: 200,
                  textShadowColor: "rgba(0, 0, 0, 0.4)",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 5,
                }}
              >
                Họ và tên:{" "}
              </Text>
              <View style={{ maxWidth: 200 }}>
                <Text
                  variant="bodyLarge"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {dataStaff?.fullname}
                </Text>
              </View>
            </View>
            <Divider bold="true" style={{ marginTop: 20 }} />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: 200,
                  textShadowColor: "rgba(0, 0, 0, 0.4)",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 5,
                }}
              >
                Tên người dùng:{" "}
              </Text>
              <View style={{ maxWidth: 200 }}>
                <Text
                  variant="bodyLarge"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {dataStaff?.username}
                </Text>
              </View>
            </View>
            <Divider bold="true" style={{ marginTop: 20 }} />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: 200,
                  textShadowColor: "rgba(0, 0, 0, 0.4)",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 5,
                }}
              >
                Số điện thoại:{" "}
              </Text>
              <View style={{ maxWidth: 200 }}>
                <Text
                  variant="bodyLarge"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {dataStaff?.phone}
                </Text>
              </View>
            </View>
            <Divider bold="true" style={{ marginTop: 20 }} />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: 200,
                  textShadowColor: "rgba(0, 0, 0, 0.4)",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 5,
                }}
              >
                Địa chỉ:{" "}
              </Text>
              <View style={{ maxWidth: 200 }}>
                <Text
                  variant="bodyLarge"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {dataStaff?.address}
                </Text>
              </View>
            </View>
            <Divider bold="true" style={{ marginTop: 20 }} />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: 200,
                  textShadowColor: "rgba(0, 0, 0, 0.4)",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 5,
                }}
              >
                Chuyên môn:{" "}
              </Text>
              <View style={{ maxWidth: 200 }}>
                {dataStaff?.masterySkills.map((skill, index) => (
                  <View style={{ flexDirection: "row", flexWrap: "wrap", }}>
                    <Text>{getCategoryName(skill)},</Text>
                  </View>





                ))}
                {/* <Text
                  variant="bodyLarge"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {dataStaff?.address}
                </Text> */}
              </View>
            </View>
            <Divider bold="true" style={{ marginTop: 20 }} />

          </View>
          <View>
            <Button
              icon="logout"
              mode="contained"
              onPress={logout}
              style={{ margin: 20 }}
            >
              Đăng xuất
            </Button>
          </View>
        </ScrollView >
      )
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    elevation: 0,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
    paddingTop: 0,
  },
  title: {
    flex: 1,
    textAlign: "center",
    marginRight: 25,
    marginTop: 5,
  },
});
