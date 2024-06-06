import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  Dimensions,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function StaffLogin({ navigation }) {
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    login_err: "",
    otp_err: "",
    regis_username_err: "",
    regis_password_err: "",
  });

  React.useEffect(() => {
    const retrieveStaffItem = async () => {
      try {
        const existingStaff = await AsyncStorage.getItem("staff");
        if (existingStaff) {
          await AsyncStorage.removeItem("staff");
        }
      } catch (error) {
        console.error("Error removing existing staff data:", error);
      }
    };

    retrieveStaffItem();
  }, []);
  const handleLoginValuesChange = (prop) => (text) => {
    setLoginValues({ ...loginValues, [prop]: text });
  };

  const handleLogin = async () => {
    setLoading(true);

    const staffLogin_Url = `https://e-tailorapi.azurewebsites.net/api/auth/staff/login`;
    const staffInfo = await AsyncStorage.getItem("Staff");
    if (staffInfo) {
      await AsyncStorage.removeItem("Staff");
    }
    try {
      const response = await fetch(staffLogin_Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginValues.username,
          password: loginValues.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("staff", JSON.stringify(data));
        setLoading(false);
        console.log("Staff Info", data);
        if (data.role === "Admin") {
          Alert.alert("Đăng nhập thất bại", "Bạn không được phép sử dụng ứng dụng này!");
        }else{
          navigation.navigate("Staff-Home");
        }
      } else {
        const errorText = await response.text();
        setLoading(false);
        setError({ ...error, login_err: errorText });
        navigation.navigate("Staff-Login");
        Alert.alert("Đăng nhập thất bại", errorText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
        style={styles.container}>
        <ImageBackground
          source={require("../assets/images/sewing-kit-with-cotton-threads-top-view.jpg")}
          style={styles.backgroundImage}
          resizeMode="cover"
        >

          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.overlay}>
              <Image style={styles.logo} source={require("../assets/images/ıngoude-removebg-preview.png")} />

              <View style={styles.inputContainer}>
                <Icon style={styles.prefix} name="person" size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="Tên đăng nhập"
                  onChangeText={handleLoginValuesChange("username")}
                  autoCapitalize="none"
                  value={loginValues.username}
                />
              </View>
              <View style={styles.inputContainer}>
                <Icon style={styles.prefix} size={20} color="#fff" name="lock-closed" />
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu"
                  onChangeText={handleLoginValuesChange("password")}
                  value={loginValues.password}
                  autoCapitalize="none"
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={[styles.button, { width: loading ? "50%" : "40%" }]} onPress={handleLogin}>
                <View style={styles.buttonWithLoading}>
                  <Text style={styles.buttonText}>Đăng nhập</Text>
                  {loading && <ActivityIndicator animating={loading} style={{ paddingLeft: 10 }} size="small" color="#fff" />}
                </View>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>

        </ImageBackground>
      </KeyboardAvoidingView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    padding: 24,
  },
  logo: {
    height: 400,
    width: 400,
    marginTop: 20,
  },
  buttonWithLoading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#e13276",
    padding: 10,
    height: 40,
    width: "40%",
    borderRadius: 20,
    marginTop: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  inputContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 20,
    width: "90%",
    marginBottom: 15,
  },
  prefix: {
    paddingHorizontal: 20,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
    color: "#000",
  },
  errorText: {
    color: "#fff",
    fontSize: 20,
    paddingLeft: 5,
    backgroundColor: "red",
    marginBottom: 10,
  },
});
