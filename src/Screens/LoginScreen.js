import React, {Component} from "react";
import {View,
        Text,
        KeyboardAvoidingView,
        ScrollView,
        StyleSheet} from "react-native";
import colors from "../Styles/Color";
import InputField from "../Components/InputField";
import InputButton from "../Components/InputButton";

export default class LoginScreen extends Component
{
    constructor()
    {
        super();

        this.state = {
            detailer : "",
            clicker : "",
            camera : ""
        };
    }

    handleDetailerChange = detailer => {
            this.setState({detailer: detailer});
    };

    handleClickerChange = clicker => {
        this.setState({clicker: clicker});
    };

    handleCameraChange = camera => {
            this.setState({camera: camera});
    };

    login = () => {
        ;
    }

    render() {
        return (
            <View style = {styles.background}>
                <ScrollView>
                    <Text style={styles.loginHeader}>Login</Text>
                    <InputField
                        labelText="Detailer"
                        writeText={this.state.detailer}
                        onChangeText={this.handleDetailerChange}
                        inputType="default"
                    />
                    <InputField
                        labelText="Clicker"
                        writeText={this.state.clicker}
                        onChangeText={this.handleClickerChange}
                        inputType="default"
                    />
                    <InputField
                        labelText="Camera"
                        writeText={this.state.camera}
                        onChangeText={this.handleCameraChange}
                        inputType="default"
                    />
                    <InputButton
                        title="Log In"
                        onPress={this.login}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        display:"flex",
        flex:1,
        backgroundColor: colors.black
    },
    loginHeader: {
        fontSize: 46,
        color: colors.white,
        fontWeight: "300",
        textAlign: 'center',
        marginBottom: 40
     }
});