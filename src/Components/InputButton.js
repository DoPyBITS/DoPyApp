import React, {Component} from "react";
import {View,
        Button,
        StyleSheet} from "react-native";
import colors from "../Styles/Color";

class InputButton extends Component
{
    render()
    {
        const {title, onPress} = this.props;
        return (
            <View style = {styles.wrapper}>
                <Button
                    onPress={onPress}
                    title={title}
                />
            </View>
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
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 30,
        color: colors.white
    }
});

export default InputButton;