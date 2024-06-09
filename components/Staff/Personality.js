import React, { useState } from 'react'
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
const Personality = ({ route, navigation }) => {
  const { data, categoryData } = route.params;
  const [loading, setLoading] = useState(true)
  // console.log("data", data)
  const getCategoryName = (id) => {
    const category = categoryData.find((item) => item.id === id);
    return category?.name;
  }

  const _goBack = () => navigation.navigate("Staff-Profile");
  return (
    <>
      <Appbar.Header style={{ height: 40 }} statusBarHeight={0}>
        <View style={styles.headerContent}>
          <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
          <Appbar.Content title="Thông tin cá nhân" titleStyle={styles.title} />
        </View>
      </Appbar.Header>
      {<View style={{ marginTop: 20, padding: 30 }}>
        <View style={{ alignSelf: "center", marginBottom: 20 }}>
          <Avatar.Image size={120} source={{ uri: data?.avatar }} />
        </View>
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
              {data?.fullname}
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
              {data?.username}
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
              {data?.phone}
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
              {data?.address}
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
            {data?.masterySkills ? data?.masterySkills.map((skill, index) => (
              <View style={{ flexDirection: "row", flexWrap: "wrap", }} key={index}>
                <Text>{getCategoryName(skill)},</Text>
              </View>
            )) : (
              <View>
                <Text>Chưa cập nhật kỹ năng chuyên môn</Text>
              </View>
            )}
          </View>
        </View>
        <Divider bold="true" style={{ marginTop: 20 }} />

      </View>}
    </>
  )
}

export default Personality

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
