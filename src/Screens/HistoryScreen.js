import React, {Component} from 'react'
import {View,
        Text,
        FlatList,
        SafeAreaView,
        TouchableOpacity,
        KeyboardAvoidingView,
        StyleSheet} from "react-native";
import colors from "../Styles/Color";

import { useFocusEffect } from '@react-navigation/native';
import EditableText from "../Components/EditableText";
import InputButton from "../Components/InputButton";
import firestore from '@react-native-firebase/firestore';

export default class HistoryScreen extends Component
{
    constructor(props)
    {
       super(props);

       this.camera = props.route.params.camera.toUpperCase();
       this.clicker = props.route.params.clicker.toUpperCase();
       this.detailer = props.route.params.detailer.toUpperCase();
       this.numSnaps = 0
       const snapShot = firestore().collection(this.camera).get()
                    .then((querySnapshot) => {
                        this.numSnaps = querySnapshot.size;
                        this.setState({isLoading:false})
                    });

       this.state = {
            isLoading:true
       };
    }

    handleSnapChoice = snapChoice => {
        snapNum = snapChoice.title;

        this.props.navigation.navigate('Billing', {
                snapNum:snapNum,
                clicker:this.clicker,
                detailer:this.detailer,
                camera:this.camera,
                })
    }

    handleNavigationButton = () => {
        this.props.navigation.navigate('Billing', {
                clicker:this.clicker,
                detailer:this.detailer,
                camera:this.camera,
                })
    }

    render() {
        var numArray = Array.from({length:this.numSnaps}, (x,i) => i+1);

        if (this.state.isLoading)
        {
            return (
                <View style={styles.background}>
                    <Text style = {styles.infoHeader}>
                        Loading...
                    </Text>
                </View>
            )
        }
        else
        {
            return (
                <SafeAreaView style={styles.background}>
                    <FlatList
                        data = {numArray}
                        renderItem={({ item }) => <EditableText title={item}
                                                                parentCallback={this.handleSnapChoice}
                                                                customItemStyle={{height:40,
                                                                                  borderWidth:0.5,
                                                                                  borderColor:colors.white}}
                                                                customTextStyle={{fontSize:16}}/> }
                    />
                    <KeyboardAvoidingView style={{alignItems:"flex-end" }}>
                        <InputButton onPress = {this.handleNavigationButton}/>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            )
        }

    }
}

const styles = StyleSheet.create({
    background: {
        display:"flex",
        flex:1,
        backgroundColor: colors.black
    },
    listStyle: {
        alignItems: 'center'
    },
    infoHeader: {
        fontSize: 12,
        color: colors.white,
        marginBottom:10
    }
});