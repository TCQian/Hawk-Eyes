import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { ButtonGroup } from "react-native-elements";
import {
  FOODCENTRE_USER,
  STALL_USER,
  PATRON_USER,
  updateUserData,
} from "../../app-redux/actions";
import { connect } from "react-redux";
import * as firebase from "firebase";

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      selectedIndex: 2,
    };
  }

  onSignupPress = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert("Passwords do not match");
      return;
    }

    let userType = "";
    if (this.state.selectedIndex == 0) {
      userType = FOODCENTRE_USER;
    }
    if (this.state.selectedIndex == 1) {
      userType = STALL_USER;
    }
    if (this.state.selectedIndex == 2) {
      userType = PATRON_USER;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        this.props.updateUserData({
          userType: userType,
          email: this.state.email,
          userId: user.user.uid,
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  updateIndex = (selectedIndex) => {
    this.setState({
      selectedIndex: selectedIndex,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Signup</Text>

        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.breakline} />

        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.breakline} />

        <TextInput
          style={styles.input}
          value={this.state.passwordConfirm}
          onChangeText={(text) => {
            this.setState({ passwordConfirm: text });
          }}
          placeholder="Password (confirm)"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.text}>Which user are you?</Text>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={this.state.selectedIndex}
          buttons={["FoodCentre Owner", "Stall Owner", "Patron"]}
          containerStyle={{ height: 100 }}
        />

        <Button
          title="Signup"
          onPress={this.onSignupPress}
          style={styles.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: "center",
  },
  breakline: {
    paddingTop: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
  },
  text: {
    marginTop: 50,
  },
});

export default connect(null, { updateUserData })(SignupScreen);
