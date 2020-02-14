/**
 * App for billing for Department of Photography
 *
 * Author: Rahul Prabhu (STD)
 */

 import React, {Component} from 'react';
 import {Text, View} from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';

 import Login from "./src/Screens/LoginScreen";
 import Billing from "./src/Screens/BillingScreen";
 import History from "./src/Screens/HistoryScreen"

const Stack = createStackNavigator();

function App()
{
    return (
        <NavigationContainer>
            <Stack.Navigator
             screenOptions={{
                 headerShown: false
               }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Billing" component={Billing} />
                <Stack.Screen name="History" component={History} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


 export default App;
