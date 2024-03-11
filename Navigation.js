import React from "react";
import { Text, SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StaffLogin from "./components/StaffLogin";
import StaffHome from "./components/Staff/StaffHome";
import StaffTask from "./components/Staff/StaffTask";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StaffProfile from "./components/StaffLogin";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Order from "./components/Staff/OrderScreen";
import OrderProduct from "./components/Staff/OrderProduct";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ name, focused }) => {
    const outlineIconName = name + "-outline";
    const filledIconName = name;

    return (
        <Icon
            name={focused ? filledIconName : outlineIconName}
            size={24}
            color={focused ? "#9f78ff" : "#aaa"}
        />
    );
};

function StaffHomeTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                labelStyle: { fontSize: 14, fontWeight: "bold" },
                activeTintColor: "#9f78ff",
                position: "absolute",
                bottom: 40,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: "#ffffff",
                borderRadius: 15,
                height: 90,
                color: "#000000",
                width: 500,

                activeTintColor: "#9f78ff",
                tabBarLabelStyle: {
                    color: "#000000",
                },
                tabBarInactiveLabelStyle: {
                    color: "#000000",
                },
            }}
        >
            <Tab.Screen
                name="Staff-Tasks"
                component={StaffTask}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                top: 10,
                            }}
                        >
                            <CustomTabIcon name="calendar" focused={focused} />
                            <Text
                                style={{ color: focused ? "#9f78ff" : "#000000", fontSize: 12 }}
                            >
                                Công Việc
                            </Text>
                        </View>
                    ),
                    tabBarLabel: () => null,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Staff-Profile"
                component={StaffProfile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                top: 10,
                            }}
                        >
                            <CustomTabIcon name="person" focused={focused} />
                            <Text
                                style={{ color: focused ? "#9f78ff" : "#000000", fontSize: 12 }}
                            >
                                Tài khoản
                            </Text>
                        </View>
                    ),
                    tabBarLabel: () => null,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Staff-Order"
                component={Order}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                top: 10,
                            }}
                        >
                            <CustomTabIcon name="add-circle" focused={focused} />
                            <Text
                                style={{ color: focused ? "#9f78ff" : "#000000", fontSize: 12 }}
                            >
                                Tạo đơn
                            </Text>
                        </View>
                    ),
                    tabBarLabel: () => null,
                    headerShown: false,
                }}
            />
       
        </Tab.Navigator>
    );
}

function StackGroup() {
    return (
        <Stack.Navigator >
            {/* <Stack.Screen
                name="Staff-Login"
                component={StaffLogin}
                options={{ headerShown: false }}
            /> */}
            <Stack.Screen
                name="Staff-Home"
                component={StaffHomeTabNavigator}
                options={{ headerShown: false }}

            />
            <Stack.Screen
                name="Staff-Order-Product"
                component={OrderProduct}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <View style={{ flex: 1, backgroundColor: "#fff", position: "relative" }}>
                <StackGroup />
            </View>
        </NavigationContainer>
    );
}
