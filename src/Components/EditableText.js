import React, {Component} from "react";
import {View,
        Text,
        StyleSheet,
        Dimensions,
        TouchableOpacity} from "react-native";
import colors from "../Styles/Color";

class EditableText extends Component
{
    sendData = () => {
        this.props.parentCallback(this.props);
    }

    render()
    {
        const {title,
               quantity,
               customItemStyle,
               customTextStyle} =  this.props
        var toPrint = "";
        if(quantity)
            toPrint = title + " x " + quantity;
        else
            toPrint = title
        return (
            <TouchableOpacity
                style={[styles.touchableStyle, customItemStyle]}
                onPress={this.sendData}
            >
                <Text style = {[customTextStyle, styles.textStyle]}>
                    {toPrint}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableStyle: {
        width:Dimensions.get('window').width,
        alignItems:'center',
        justifyContent:'center'
    },
    textStyle: {
//        fontSize: 12,
        color:colors.white,
        textAlign:'center'
    }
})

export default EditableText;