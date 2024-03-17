import React, { useEffect, useState } from "react";
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
import OrderScreen from "./components/Staff/OrderScreen";
import OrderProduct from "./components/Staff/OrderProduct";
import StaffTaskDetail from "./components/Staff/StaffTaskDetail";
import CreateCustomer from "./components/Staff/CreateCustomer";
import OrderDetail from "./components/Staff/OrderDetail";
import OrderPayment from "./components/Staff/OrderPayment";
// import Order from './components/Staff/OrderScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from './components/Bottoms-Navigation/Home'
import Blog from './components/Bottoms-Navigation/Blog'
import SampleProducts from './components/Bottoms-Navigation/SampleProducts'
import Order from './components/Bottoms-Navigation/Order'
import ProductDetail2 from './components/UI/ProductDetail';
import ProductDetail from './components/Screens/ProductDetail';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const OrderStack = createStackNavigator();
const StaffTab = createBottomTabNavigator();
const StaffStack = createStackNavigator();
const CustomTabIcon = ({ name, focused, color }) => {
    const outlineIconName = name + "-outline";
    const filledIconName = name;

    return (
        <Icon
            name={focused ? filledIconName : outlineIconName}
            size={24}
            color={focused ? color : "#aaa"}
        />
    );

};
function OrderStackNavigator() {
    return (
        <OrderStack.Navigator initialRouteName="Staff-Order" screenOptions={{ headerShown: false }}>
            <OrderStack.Screen name="Staff-Order" component={OrderScreen} />
            <OrderStack.Screen name="Staff-Order-Payment" component={OrderPayment} />
            <OrderStack.Screen name="Staff-Order-Product" component={OrderProduct} />
            <OrderStack.Screen name="Staff-Create-Customer" component={CreateCustomer} />
            <OrderStack.Screen name="Staff-Order-Detail" component={OrderDetail} />

        </OrderStack.Navigator>
    );
}
function StaffStackNavigator() {
    return (
        <StaffStack.Navigator initialRouteName="Staff-Tasks">
            <StaffStack.Screen
                name="Staff-Task-Detail"
                component={StaffTaskDetail}
                options={{
                    headerShown: false,
                }}
            />
            <StaffStack.Screen
                name="Staff-Tasks"
                component={StaffTask}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
                            <CustomTabIcon name="calendar" color={"#FFFFFF"} focused={focused} />
                            <Text style={{ color: focused ? "#9f78ff" : "#000000", fontSize: 12 }}>
                                Công Việc
                            </Text>
                        </View>
                    ),
                    tabBarLabel: () => null,
                    headerShown: false,
                }}
            />
        </StaffStack.Navigator>
    )


}
function StaffNavigator() {
    return (
        <StaffTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 5,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: "rgb(29, 37, 71)",
                    borderRadius: 15,
                    height: 70,
                },
                tabBarLabelStyle: {
                    color: "#000000",
                    fontSize: 12,
                },
                tabBarInactiveTintColor: "#000000",
                tabBarActiveTintColor: "#9f78ff",
            }}

        >

            <StaffTab.Screen
                name="Staff-Tasks-Stack"
                component={StaffStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <CustomTabIcon name="calendar" color={"#FFFFFF"} focused={focused} />
                            <Text style={{ color: focused ? "#FFFFFF" : "#D9D9D9", fontSize: 12 }}>
                                Công Việc
                            </Text>
                        </View>
                    ),
                    tabBarLabel: () => null,
                    headerShown: false,
                }}
            />
            <StaffTab.Screen
                name="Staff-Profile"
                component={StaffProfile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <CustomTabIcon name="person" color={"#FFFFFF"} focused={focused} />
                            <Text style={{ color: focused ? "#FFFFFF" : "#D9D9D9", fontSize: 12 }}>
                                Tài khoản
                            </Text>
                        </View>
                    ),
                    tabBarLabel: () => null
                }}
            />

            <StaffTab.Screen
                name="Staff-Order-Stack"
                component={OrderStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CustomTabIcon name="add-circle" color={"#FFFFFF"} focused={focused} />
                            <Text
                                style={{ color: focused ? "#FFFFFF" : "#D9D9D9", fontSize: 12 }}
                            >
                                Tạo đơn
                            </Text>
                        </View>
                    ),
                    tabBarLabel: () => null,
                    headerShown: false,
                }}
            />
            {/* <StaffTab.Screen
                name="Staff-Order"
                component={OrderScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
                            <CustomTabIcon name="add-circle" color={"#FFFFFF"} focused={focused} />
                            <Text style={{ color: focused ? "#9f78ff" : "#000000", fontSize: 12 }}>
                                Tạo đơn
                            </Text>
                        </View>
                    ),
                    tabBarLabel: () => null
                }}
            /> */}
        </StaffTab.Navigator>
    );
}

function StaffHomeTabNavigator() {
    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 5,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: "#e85474",
                    borderRadius: 15,
                    height: 70,
                },
                tabBarLabelStyle: {
                    color: "#000000",
                    fontSize: 12,
                },
                tabBarInactiveTintColor: "#000000",
                tabBarActiveTintColor: "#9f78ff",
            }}>

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
                            <CustomTabIcon name="home" color={"#FFFFFF"} focused={focused} />
                            <Text style={{ color: focused ? "#FFFFFF" : "#D9D9D9D9", fontSize: 12 }}>
                                Trang chủ
                            </Text>
                        </View>

                    ),
                    tabBarLabel: () => null,
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Blog"
                component={Blog}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
                            <CustomTabIcon name="bookmarks" color={"#FFFFFF"} focused={focused} />
                            <Text style={{ color: focused ? "#FFFFFF" : "#D9D9D9D9", fontSize: 12 }}>
                                Bài viết
                            </Text>
                        </View>

                    ),
                    tabBarLabel: () => null,
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Sample-products"
                component={SampleProducts}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
                            <CustomTabIcon name="shirt" color={"#FFFFFF"} focused={focused} />
                            <Text style={{ color: focused ? "#FFFFFF" : "#D9D9D9D9", fontSize: 12 }}>
                                Sản phẩm mẫu
                            </Text>
                        </View>

                    ),
                    tabBarLabel: () => null,
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Order"
                component={Order}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
                            <CustomTabIcon name="cart" color={"#FFFFFF"} focused={focused} />
                            <Text style={{ color: focused ? "#FFFFFF" : "#D9D9D9D9", fontSize: 12 }}>
                                Đơn hàng
                            </Text>
                        </View>

                    ),
                    tabBarLabel: () => null,
                    headerShown: false
                }}

            />

        </Tab.Navigator>
    )
}


function StackGroup({ user }) {
    return (

        <Stack.Navigator
            initialRouteName="Staff-Login"
        >
            <Stack.Screen name="Staff-Login" component={StaffLogin} options={{ headerShown: false }} />
            <Stack.Screen name="Staff-Home" component={StaffNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Customer-Home" component={StaffHomeTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Product-detail2" component={ProductDetail2} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
        </Stack.Navigator >
    )


}

export default function Navigation() {

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const retrieveUserRole = async () => {
            try {
                const role = await AsyncStorage.getItem("staff");
                if (role !== null) {
                    setUserRole(JSON.parse(role));
                }
            } catch (error) {
                console.error("Error retrieving user role:", error);
            }
        };

        retrieveUserRole();
    }, []);
    return (
        <NavigationContainer>
            <View style={{ flex: 0.99 }}>
                <StackGroup user={userRole} />
            </View>
        </NavigationContainer>
    );
}
