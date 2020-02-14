import React, {Component} from "react";
import {View,
        TouchableOpacity,
        Text,
        StyleSheet} from "react-native";
import colors from "../Styles/Color";
import Icon from "react-native-vector-icons/FontAwesome";

class ClickableCounter extends Component
{
    render()
    {
        const {defaultNum, onPlus, onMinus} = this.props;
        return (
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    style={styles.plusCounterStyle}
                    onPress={onPlus}
                >
                    <Icon name={"plus"} size ={10} color = {colors.black} />
                </TouchableOpacity>
                <Text style={{fontSize:10, color:colors.white, marginRight:10, marginLeft:10}}>
                    {defaultNum}
                </Text>
                <TouchableOpacity
                    style={styles.plusCounterStyle}
                    onPress={onMinus}
                >
                    <Icon name={"minus"} size ={10} color = {colors.black} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    plusCounterStyle: {
        width:20,
        height:20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#eee8d5'
    },

});

export default ClickableCounter;