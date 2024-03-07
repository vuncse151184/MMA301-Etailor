import React from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StaffLogin from './components/Staff/login';
import StaffHome from './components/Staff';
import StaffTask from './components/Staff/task';
import CustomerLogin from './components/Customer/login';
import CustomerRegister from './components/Customer/register';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StaffProfile from './components/Staff/profile';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ name, focused }) => (

    <Icon name={name} size={24} color={focused ? '#9f78ff' : '#aaa'} />

);
function StaffHomeTabNavigator() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 14, fontWeight: "bold" },
                activeTintColor: '#9f78ff',

            }}
        >
            <Tab.Screen
                name="Staff-Tasks"
                component={StaffTask}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <CustomTabIcon name="home-outline" focused={focused} />
                    ),
                    tabBarLabel: "Trang Chủ",
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Staff-Profile"
                component={StaffProfile}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <CustomTabIcon name="person-outline" focused={focused} />
                    ),
                    tabBarLabel: "Tài khoản",
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}

function StackGroup() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Staff-Login" component={StaffLogin} options={{ headerShown: false }} />
            <Stack.Screen name="Staff-Home" component={StaffHomeTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Customer-Login" component={CustomerLogin} options={{ headerShown: false }} />
            <Stack.Screen name="Customer-Register" component={CustomerRegister} options={{ headerShown: false }} />


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
