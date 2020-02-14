import React, {Component} from "react";
import {View,
        Text,
        ScrollView,
        CheckBox,
        KeyboardAvoidingView,
        StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../Styles/Color";
import InputField from "../Components/InputField";
import InputButton from "../Components/InputButton";
import ClickableCounter from "../Components/ClickableCounter";
import EditableText from "../Components/EditableText";

import firestore from '@react-native-firebase/firestore';

export default class BillingScreen extends Component
{
    constructor(props)
    {
        super(props);

        this.idNumbers = [];
        this.quantities = [];

        this.state = {
            detailer : props.route.params.detailer.toUpperCase(),
            clicker : props.route.params.clicker.toUpperCase(),
            camera : props.route.params.camera.toUpperCase(),
            snapno : 1,
            isHigherDegree : false,
            isOutstation : false,
            IDNumber : "",
            Quantity:1,
            editingText:"",
            description:"",
            currIdx:0,
            isLoading: true
        };

        if (props.route.params.snapNum)
        {
            const snapShot = firestore().collection(this.state.camera)
                .doc(String(props.route.params.snapNum))
                .get()
                .then((docSnapshot) => {
                    this.idNumbers = docSnapshot.idNumbers;
                    this.quantities = docSnapshot.quantities;
                    this.setState({isLoading:false,
                                   isOutstation:docSnapshot.outstation,
                                   description: docSnapshot.description,
                                   snapno: props.route.params.snapNum});
                });
        }
        else
        {
            var numSnaps = 0
            const snapShot = firestore().collection(this.state.camera).get()
                        .then((querySnapshot) => {
                            this.setState({isLoading:false,
                                           snapno: querySnapshot.size+1})
                        });
        }
    }

    handleOutstationChange = () => {
        this.setState({isOutstation: !this.state.isOutstation})
    }

    handleDegreeChange = () => {
        this.setState({isHigherDegree: !this.state.isHigherDegree})
    }

    handleIDNumberChange = IDNumber => {
        this.setState({IDNumber : IDNumber});
    }

    handleIDNumberSubmit = () => {
        if (/^\d+$/.test(this.state.IDNumber) && this.state.IDNumber.length == 6
            && !this.idNumbers.includes(this.state.IDNumber))
        {
            var actualID = this.state.isHigherDegree?"M"+this.state.IDNumber:this.state.IDNumber;
            if (this.state.currIdx == this.idNumbers.length)
            {
                this.idNumbers.push(actualID);
                this.quantities.push(this.state.Quantity);
            }
            else
            {
                this.idNumbers[this.state.currIdx] = actualID;
                this.quantities[this.state.currIdx] = this.state.Quantity;
            }
            this.setState({IDNumber:"", Quantity:1, currIdx:this.idNumbers.length});
        }
    }

    handlePlus = () => {
        this.setState({Quantity: this.state.Quantity+1});
    }

    handleMinus = () => {
        this.setState({Quantity: this.state.Quantity-1});
    }

    handleTextEdit = textEdit => {
       this.setState({IDNumber:textEdit.title,
                      Quantity:textEdit.quantity,
                      currIdx:this.idNumbers.indexOf(textEdit.title)});
    }

    handleDescriptionChange = description => {
        this.setState({description: description});
    }

    handleSnapSubmit = () => {
        console.log(this.quantities)

        firestore().collection(this.state.camera)
                 .doc(String(this.state.snapno))
                 .set( {
                    clicker: this.state.clicker,
                    detailer: this.state.detailer,
                    description: this.state.description,
                    outstation: this.state.isOutstation,
                    idNumbers: this.idNumbers,
                    quantities: this.state.quantities
                 })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

        this.idNumbers = [];
        this.quantities = [];
        this.setState({isOutstation : false,
                       IDNumber : "",
                       Quantity:1,
                       editingText:"",
                       description:"",
                       currIdx:0,
                       snapno:this.state.snapno+1
                       })
    }

    render()
    {
        if(this.state.isLoading)
        {
            return (
                <View style={styles.background}>
                    <Text>
                        Loading...
                    </Text>
                </View>
            );
        }
        else
        {
            return (
                <View style = {styles.background}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={[{flex:1, textAlign:'center'},styles.infoHeader]}>
                            Clicker: {this.state.clicker}
                        </Text>
                        <Text style={[{flex:1, textAlign:'center'},styles.infoHeader]}>
                            Detailer: {this.state.detailer}
                        </Text>
                        <Text style={[{flex:1, textAlign:'center'},styles.infoHeader]}>
                            Camera: {this.state.camera}
                        </Text>
                    </View>
                    <Text style={[{textAlign:'center'},styles.infoHeader]}>
                        Snap number: {this.state.snapno}
                    </Text>
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:1, alignItems:'center'}}>
                            <CheckBox value={this.state.isOutstation}
                                      onValueChange={this.handleOutstationChange}
                            />
                            <Text style={styles.infoHeader}>
                                Outstation
                            </Text>
                        </View>
                        <View style={{flex:1, alignItems:'center'}}>
                            <CheckBox value={this.state.isHigherDegree}
                                      onValueChange={this.handleDegreeChange}
                            />
                            <Text style={styles.infoHeader}>
                                Higher Degree
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                        <InputField
                            labelText="ID Number"
                            inputType="idno"
                            blurOnSubmit={false}
                            writeText={this.state.IDNumber}
                            onChangeText={this.handleIDNumberChange}
                            onSubmitEditing={this.handleIDNumberSubmit}
                        />
                        <ClickableCounter
                            defaultNum={this.state.Quantity}
                            onPlus={this.handlePlus}
                            onMinus={this.handleMinus}
                        />
                    </View>
                    <ScrollView>
                        <InputField
                            labelText="Description"
                            inputType="default"
                            writeText={this.state.Description}
                            onChangeText={this.handleDescriptionChange}
                        />
                    </ScrollView>
                    <ScrollView>
                        <View style={{flex:1, alignItems:'center'}}>
                            {this.idNumbers.map((info, i) => <EditableText title={info}
                                                    quantity={this.quantities[i]}
                                                    parentCallback={this.handleTextEdit}
                                                    customItemStyle={{height:20}}
                                                    customTextStyle={{fontSize:12}}/>)}
                        </View>
                    </ScrollView>
                    <KeyboardAvoidingView style={{alignItems:"flex-end" }}>
                        <InputButton onPress={this.handleSnapSubmit}/>
                    </KeyboardAvoidingView>
                </View>
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
    infoHeader: {
        fontSize: 12,
        color: colors.white,
        marginBottom:10
    }
});