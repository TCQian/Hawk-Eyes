import React from "react";
import { connect } from "react-redux";
import { Button, StyleSheet, TextInput, View } from "react-native";
import Constants from "expo-constants";
import { getItemsByName } from "../functions/functions";
import { editFoodCentresData } from "../app-redux/actions";
import { addCreatedFoodCentre } from "../app-redux/historyActions";

class EditFCScreen extends React.Component {
  handleSubmit = (formState) => {
    const newFoodCentre = {
      name: formState.name,
      numberOfStalls: formState.numberOfStalls,
      capacity: formState.capacity,
      address: formState.address,
      key: formState.key,
      createdBy: formState.createdBy,
    };
    this.props.editFoodCentresData([
      this.props.route.params.foodCentre,
      newFoodCentre,
    ]);
    this.props.navigation.navigate("Search");
  };

  render() {
    return (
      <EditFCForm
        onSubmit={this.handleSubmit}
        foodCentres={this.props.foodCentres}
        foodCentre={this.props.route.params.foodCentre}
      />
    );
  }
}

class EditFCForm extends React.Component {
  state = {
    name: this.props.foodCentre.name,
    numberOfStalls: this.props.foodCentre.numberOfStalls,
    capacity: this.props.foodCentre.capacity,
    address: this.props.foodCentre.address,
    key: this.props.foodCentre.key,
    createdBy: this.props.foodCentre.createdBy,
    isFormValid: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.name !== prevState.name ||
      this.state.numberOfStalls !== prevState.numberOfStalls ||
      this.state.capacity !== prevState.capacity ||
      this.state.address !== prevState.address
    ) {
      this.validateForm();
    }
  }

  validateForm = () => {
    if (
      this.state.name.length > 0 &&
      +this.state.numberOfStalls > 0 &&
      +this.state.capacity > 0 &&
      this.state.address.length > 0
    ) {
      this.setState({ isFormValid: true });
    } else {
      this.setState({ isFormValid: false });
    }
  };

  getHandler = (key) => (val) => {
    this.setState({ [key]: val });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
    this.setState({
      name: "",
      numberOfStalls: "",
      capacity: "",
      address: "",
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.getHandler("name")}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={this.state.numberOfStalls}
          onChangeText={this.getHandler("numberOfStalls")}
          placeholder="Number Of Stalls"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={this.state.capacity}
          onChangeText={this.getHandler("capacity")}
          placeholder="Capacity"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={this.state.address}
          onChangeText={this.getHandler("address")}
          placeholder="Address"
        />
        <Button
          title="Save changes"
          onPress={this.handleSubmit}
          disabled={!this.state.isFormValid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  input: {
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});

const mapStateToProps = (state) => ({
  foodCentres: state.foodCentres,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addCreatedFoodCentre: (foodCentreName) =>
      dispatch(addCreatedFoodCentre(foodCentreName)),
    editFoodCentresData: (foodCentre) =>
      dispatch(editFoodCentresData(foodCentre)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFCScreen);
