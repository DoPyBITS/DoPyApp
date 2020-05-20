import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import colors from '../Styles/Color';

class InputButton extends Component {
  render() {
    const {title, onPress} = this.props;
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.inputButtonStyle} onPress={onPress}>
          <Text style={styles.textStyle}> Login </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputButtonStyle: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    backgroundColor: '#292929',
    borderRadius: 25,
    marginRight: 5,
    marginBottom: 5,
  },
  textStyle: {
    color: colors.white,
    fontFamily: 'Roboto-Thin',
  },
});

export default InputButton;
