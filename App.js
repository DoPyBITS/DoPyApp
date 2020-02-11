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

 export default class App extends Component {
   render() {
     return <Billing />;
  }
 }
