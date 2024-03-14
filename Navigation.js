import React, { useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StaffLogin from "./components/StaffLogin";
import StaffHome from "./components/Staff/StaffHome";
import StaffTask from "./components/Staff/StaffTask";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StaffProfile from "./components/Staff/StaffProfile";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Order from "./components/Staff/OrderScreen";
import OrderProduct from "./components/Staff/OrderProduct";
import StaffTaskDetail from "./components/Staff/StaffTaskDetail";
import CreateCustomer from "./components/Staff/CreateCustomer";
import OrderDetail from "./components/Staff/OrderDetail";
import OrderPayment from "./components/Staff/OrderPayment";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const OrderStack = createStackNavigator();

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
        // screenOptions={{
        //     labelStyle: { fontSize: 14, fontWeight: "bold" },
        //     style: {
        //         bottom: 50,
        //         left: 20,
        //         right: 20,
        //         elevation: 0,
        //         backgroundColor: "#000000",
        //         borderRadius: 15,
        //         height: 120,
        //         color: "#000000",
        //         width: 500,
        //     },
        //     activeTintColor: "#9f78ff",
        //     position: "absolute",

        //     activeTintColor: "#9f78ff",
        //     tabBarLabelStyle: {
        //         color: "#000000",
        //     },
        //     tabBarInactiveLabelStyle: {
        //         color: "#000000",
        //     },
        // }}
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
                                top: 5,
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
                                top: 5,
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
                name="Staff-Order-Stack"
                component={OrderStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                top: 5,
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
function OrderStackNavigator() {
    return (
        <OrderStack.Navigator initialRouteName="Staff-Order" screenOptions={{ headerShown: false }}>
            <OrderStack.Screen name="Staff-Order" component={Order} />
            <OrderStack.Screen name="Staff-Order-Payment" component={OrderPayment} />
            <OrderStack.Screen name="Staff-Order-Product" component={OrderProduct} />
            <OrderStack.Screen name="Staff-Create-Customer" component={CreateCustomer} />
            <OrderStack.Screen name="Staff-Order-Detail" component={OrderDetail} />
        </OrderStack.Navigator>
    );
}

function StackGroup() {
    return (
        <Stack.Navigator>
            {/* initialRouteName="Staff-Login" */}
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
                name="Staff-Task-Detail"
                component={StaffTaskDetail}
                options={{
                    headerTitleAlign: "center",
                }}
            />
        </Stack.Navigator>
    );
}

export default function Navigation() {


    return (
        <NavigationContainer>
            <View style={{ flex: 0.99 }}>
                <StackGroup />
            </View>
        </NavigationContainer>
    );
}
