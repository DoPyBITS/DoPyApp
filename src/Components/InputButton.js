import React, {Component} from "react";
import {View,
        Button,
        TouchableOpacity,
        StyleSheet} from "react-native";
import colors from "../Styles/Color";
import Icon from "react-native-vector-icons/FontAwesome";

class InputButton extends Component
{
    render()
    {
        const {title, onPress} = this.props;
        return (
            <TouchableOpacity
               style={styles.inputButtonStyle}
               onPress={onPress}
             >
               <Icon name={"chevron-right"}  size={30} color = {colors.black} />
             </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    inputButtonStyle: {
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:50,
       height:50,
       backgroundColor:'#eee8d5',
       borderRadius:100,
       marginRight: 5,
       marginBottom: 5
    }
});

export default InputButton;