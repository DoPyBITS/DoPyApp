import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import colors from '../styles/color';

import {useFocusEffect} from '@react-navigation/native';
import ClickableText from '../components/ClickableText';
import InputButton from '../components/InputButton';
import firestore from '@react-native-firebase/firestore';

export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);

    this.camera = props.route.params.camera.toUpperCase();
    this.clicker = props.route.params.clicker.toUpperCase();
    this.detailer = props.route.params.detailer.toUpperCase();
    this.numSnaps = 0;
    const snapShot = firestore()
      .collection(this.camera)
      .get()
      .then(querySnapshot => {
        this.numSnaps = querySnapshot.size;
        this.setState({isLoading: false});
      })

    this.state = {
      isLoading: true,
    };

    const unsubscribe = props.navigation.addListener('focus', () => {
      this.setState({isLoading: true});
      const snapShot = firestore()
        .collection(this.camera)
        .get()
        .then(querySnapshot => {
          this.numSnaps = querySnapshot.size;
          this.setState({isLoading: false});
        })
    });
  }

  handleSnapChoice = snapChoice => {
    snapNum = snapChoice.title;

    this.props.navigation.navigate('Billing', {
      totalSnaps: this.numSnaps,
      snapNum: snapNum,
      clicker: this.clicker,
      detailer: this.detailer,
      camera: this.camera,
    });
  };

  handleNavigationButton = () => {
    this.props.navigation.navigate('Billing', {
      totalSnaps: this.numSnaps,
      clicker: this.clicker,
      detailer: this.detailer,
      camera: this.camera,
    });
  };

  render() {
    const numArray = Array.from({length: this.numSnaps}, (x, i) => i + 1);

    if (this.state.isLoading) {
      return (
        <View style={styles.background}>
          <Text style={styles.infoHeader}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <SafeAreaView style={styles.background}>
          <FlatList
            data={numArray}
            renderItem={({item}) => (
              <ClickableText
                title={item}
                parentCallback={this.handleSnapChoice}
                customItemStyle={{
                  height: 40,
                  borderWidth: 0.5,
                  borderColor: colors.white,
                }}
                customTextStyle={{fontSize: 16}}
              />
            )}
          />
          <KeyboardAvoidingView style={{alignItems: 'flex-end'}}>
            <InputButton onPress={this.handleNavigationButton} />
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  background: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.black,
  },
  listStyle: {
    alignItems: 'center',
  },
  infoHeader: {
    fontSize: 12,
    color: colors.white,
    marginBottom: 10,
  },
});
