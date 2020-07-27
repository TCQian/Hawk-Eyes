import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)

      .then(
        () => {},
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  onCreateAccountPress = () => {
    this.props.navigation.navigate("SignUpScreen");
  };

  onForgotPasswordPress = () => {
    this.props.navigation.push("ForgotPasswordScreen");
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <Text>Login</Text>

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

          <Button title="Login" onPress={this.onLoginPress} />
          <Button
            title="Create account..."
            onPress={this.onCreateAccountPress}
          />
          <Button
            title="Forgot Password..."
            onPress={this.onForgotPasswordPress}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
  },
  breakline: {
    paddingTop: 10,
  },
});
