import React, {Component} from "react";
import {View,
        Text,
        ScrollView,
        CheckBox,
        KeyboardAvoidingView,
        TouchableOpacity,
        StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../Styles/Color";
import InputField from "../Components/InputField";
import InputButton from "../Components/InputButton";

export default class BillingScreen extends Component
{
    constructor()
    {
        super();

        this.idNumbers = [];

        this.state = {
            detailer : "STD",
            clicker : "GNH",
            camera : "Candidate",
            snapno : 1,
            isHigherDegree : false,
            isOutstation : false,
            IDNumber : ""
        };
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
        if (/^\d+$/.test(this.state.IDNumber) && this.state.IDNumber.length == 6)
        {
            var actualID = this.state.isHigherDegree?"M"+this.state.IDNumber:this.state.IDNumber;
            this.idNumbers.push(actualID);
            this.setState({IDNumber:""});
        }
    }

    render()
    {
        return (
            <View style = {styles.background}>
                <ScrollView>
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
                    <Text style={[{flex:1, textAlign:'center'},styles.infoHeader]}>
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
                    <InputField
                        labelText="ID Number"
                        inputType="idno"
                        writeText={this.state.IDNumber}
                        onChangeText={this.handleIDNumberChange}
                        onSubmitEditing={this.handleIDNumberSubmit}
                    />
                    <View style={{flex:1, alignItems:'center'}}>
                        {this.idNumbers.map(info => <Text style={styles.infoHeader}>{info}</Text>)}
                    </View>
                    <TouchableOpacity
                       style={{
                           borderWidth:1,
                           borderColor:'rgba(0,0,0,0.2)',
                           alignItems:'center',
                           justifyContent:'center',
                           width:40,
                           height:40,
                           backgroundColor:'#fff',
                           borderRadius:100,
                         }}
                     >
                       <Icon name={"chevron-right"}  size={20} color = {colors.brblack} />
                     </TouchableOpacity>
                </ScrollView>
            </View>
        )
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