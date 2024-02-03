import React from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StaffLogin from './components/Staff/login';
import StaffHome from './components/Staff';
import StaffTask from './components/Staff/task';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StaffProfile from './components/Staff/profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StaffHomeTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Staff-Tasks" component={StaffTask} options={{ headerShown: false }} />
            <Tab.Screen name="Staff-Profile" component={StaffProfile} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

function StackGroup() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Staff-Login" component={StaffLogin} options={{ headerShown: false }} />
            <Stack.Screen name="Staff-Home" component={StaffHomeTabNavigator} options={{ headerShown: false }} />
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
