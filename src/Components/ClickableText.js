import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../styles/color';

class ClickableText extends Component {
  sendData = () => {
    this.props.parentCallback(this.props);
  };

  render() {
    const {title, customItemStyle, customTextStyle} = this.props;
    return (
      <TouchableOpacity
        style={[styles.touchableStyle, customItemStyle]}
        onPress={this.sendData}>
        <Text style={[customTextStyle, styles.textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchableStyle: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 7,
  },
  textStyle: {
    //        fontSize: 12,
    color: colors.white,
    textAlign: 'center',
  },
});

export default ClickableText;
