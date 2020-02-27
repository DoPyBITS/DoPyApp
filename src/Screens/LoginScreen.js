import React, {Component} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Picker,
  StyleSheet,
} from 'react-native';
import colors from '../styles/color';
import InputField from '../components/InputField';
import InputButton from '../components/InputButton';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailer: '',
      clicker: '',
      camera: 'CANDIDATE',
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
    this.props.navigation.navigate('History', {
      clicker: this.state.clicker,
      detailer: this.state.detailer,
      camera: this.state.camera,
    });
  };

  render() {
    return (
      <View style={styles.background}>
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
          <Picker
            style={{color: colors.white}}
            selectedValue={this.state.camera}
            onValueChange={this.handleCameraChange}>
            <Picker.Item label="Candidate" value="CANDIDATE" />
            <Picker.Item label="Kummi" value="KUMMI" />
            <Picker.Item label="Kaiku" value="KAIKU" />
            <Picker.Item label="Zuk01" value="ZUK01" />
            <Picker.Item label="Zuk03" value="ZUK03" />
            <Picker.Item label="Zuk09" value="ZUK09" />
            <Picker.Item label="Sextape" value="SEXTAPE" />
            <Picker.Item label="Sapnupuas" value="SAPNUPUAS" />
            <Picker.Item label="Chicha" value="CHICHA" />
            <Picker.Item label="Liti" value="LITI" />
          </Picker>
        </ScrollView>
        <KeyboardAvoidingView style={{alignItems: 'flex-end'}}>
          <InputButton onPress={this.login} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.black,
  },
  loginHeader: {
    fontSize: 46,
    color: colors.white,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 40,
  },
});
