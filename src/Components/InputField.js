import React, {Component} from 'react';
import colors from '../Styles/Color';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    const {
      labelText,
      inputType,
      writeText,
      customStyle,
      blurOnSubmit,
      onChangeText,
      onSubmitEditing,
    } = this.props;

    const keyboardType = inputType == 'idno' ? 'number-pad' : 'default';

    return (
      <View style={styles.wrapper}>
        <TextInput
          value={writeText}
          placeholder={labelText}
          style={styles.inputFieldStyle}
          autoCorrect={false}
          blurOnSubmit={blurOnSubmit}
          onChangeText={onChangeText}
          autoCapitalize="characters"
          keyboardType={keyboardType}
          textColor={colors.white}
          placeholderTextColor={colors.white}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#292929',
    borderRadius: 25,
    height: 50,
    width: Dimensions.get('window').width-20,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputFieldStyle: {
    height: 50,
    color: colors.white,
    fontFamily: 'Roboto-Thin',
  },
});

export default InputField;
