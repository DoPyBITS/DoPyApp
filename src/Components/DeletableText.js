import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../Styles/Color';
import Icon from 'react-native-vector-icons/FontAwesome';

class DeletableText extends Component {
  sendData = () => {
    this.props.parentCallback(this.props);
  };

  sendDeleteData = () => {
    this.props.parentDeleteCallback(this.props);
  };

  render() {
    const {title, quantity, customItemStyle, customTextStyle} = this.props;
    let toPrint = '';
    if (quantity) {
      toPrint = title + ' x ' + quantity;
    } else {
      toPrint = title;
    }
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={[styles.touchableStyle, customItemStyle]}
          onPress={this.sendData}>
          <Text style={[customTextStyle, styles.textStyle]}>{toPrint}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.sendDeleteData}
          style={{flex: 1, alignItems: 'center'}}>
          <Icon name={'times-circle'} size={25} color={colors.white} />
        </TouchableOpacity>
      </View>
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

export default DeletableText;
