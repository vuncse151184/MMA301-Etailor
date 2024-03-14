import React from 'react'
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StaffLogin from './components/Staff/StaffLogin';
import StaffHome from './components/Staff/StaffHome';
import StaffTask from './components/Staff/StaffTask';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StaffProfile from './components/Staff/StaffProfile';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
// import Order from './components/Staff/OrderScreen';

import Home from './components/Bottoms-Navigation/Home'
import Blog from './components/Bottoms-Navigation/Blog'
import SampleProducts from './components/Bottoms-Navigation/SampleProducts'
import Order from './components/Bottoms-Navigation/Order'
import ProductDetail2 from './components/UI/ProductDetail';
import ProductDetail from './components/Screens/ProductDetail';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ name, focused }) => {
    const outlineIconName = name + '-outline';
    const filledIconName = name;

    return (
        <Icon
            name={focused ? filledIconName : outlineIconName}
            size={24}
            color={focused ? "#9f78ff" : "#aaa"}
        />
    );
}

function StaffHomeTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                labelStyle: { fontSize: 14, fontWeight: "bold" },
                activeTintColor: '#9f78ff',
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90
                },
                activeTintColor: '#9f78ff',
                tabBarLabelStyle: {
                    color: '#000000',
                },
                tabBarInactiveLabelStyle: {
                    color: '#000000',
                },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
                            <CustomTabIcon name="home" focused={focused} />
                            <Text style={{ color: focused ? "#9f78ff" : "#000000", fontSize: 12 }}>
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
                            <CustomTabIcon name="calendar" focused={focused} />
                            <Text style={{ color: focused ? "#9f78ff" : "#000000", fontSize: 12 }}>
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
                            <CustomTabIcon name="person" focused={focused} />
                            <Text style={{ color: focused ? "#9f78ff" : "#000000", fontSize: 12 }}>
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
                            <CustomTabIcon name="add-circle" focused={focused} />
                            <Text style={{ color: focused ? "#9f78ff" : "#000000", fontSize: 12 }}>
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

function StackGroup() {
    return (
        <Stack.Navigator
        >
            {/* <Stack.Screen name="Staff-Login" component={StaffLogin} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Staff-Home" component={StaffHomeTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Product-detail2" component={ProductDetail2} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <StackGroup />
        </NavigationContainer>
    )
}
