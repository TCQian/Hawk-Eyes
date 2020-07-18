import React from "react";
import { connect } from "react-redux";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import Constants from "expo-constants";
import {
  updateStallsData,
  updateMenusData,
  editStallsData,
  editMenusData,
} from "../../app-redux/actions";
import { getItemsByName, getItemsByParentKey } from "../../functions/functions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class AddStallNMenuScreen extends React.Component {
  state = {
    fcName: "",
    stallName: "",
    menuName: "",
    description: "",
    price: "",
    isStallFormValid: false,
    isMenuFormValid: false,
    stallParentId: NaN,
    menuParentId: NaN,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.fcName !== prevState.fcName ||
      this.state.stallName !== prevState.stallName ||
      this.state.menuName !== prevState.menuName ||
      this.state.description !== prevState.description ||
      this.state.price !== prevState.price
    ) {
      this.validateForm();
    }
  }

  validateForm = () => {
    const foodCentre = getItemsByName(
      this.props.foodCentres,
      this.state.fcName
    );
    const stall = getItemsByName(
      this.props.stalls,
      this.state.stallName
    ).filter((item) => item.parentId === foodCentre[0].id);

    if (
      // Food Centre exists, stall to be added
      foodCentre.length == 1 &&
      this.state.stallName.length > 0 &&
      stall.length == 0
    ) {
      this.setState({
        isStallFormValid: true,
        stallParentId: foodCentre[0].id,
      });
    } else {
      this.setState({ isStallFormValid: false });
    }

    if (
      // Food Centre exists, stall exists, menu to be added
      foodCentre.length == 1 &&
      stall.length == 1 &&
      this.state.menuName.length > 0 &&
      this.state.description.length > 0 &&
      this.state.price.length > 0
    ) {
      this.setState({
        isMenuFormValid: true,
        menuParentId: stall[0].id,
      });
    } else {
      this.setState({ isMenuFormValid: false });
    }
  };

  getHandler = (key) => (val) => {
    this.setState({ [key]: val });
  };

  handleCreateStall = () => {
    this.props.updateStallsData({
      name: this.state.stallName,
      parentId: this.state.stallParentId,
      createdBy: this.props.user.userId,
    });
    this.setState({ isStallFormValid: false });
  };

  handleCreateMenu = () => {
    this.props.updateMenusData({
      name: this.state.menuName,
      description: this.state.description,
      price: this.state.price,
      parentId: this.state.menuParentId,
      createdBy: this.props.user.userId,
    });

    this.setState({
      menuName: "",
      description: "",
      price: "",
    });
  };

  handleDone = () => {
    this.setState({
      fcName: "",
      stallName: "",
      menuName: "",
      description: "",
      price: "",
      stallParentId: "",
      menuParentId: "",
    });
    this.props.navigation.navigate("Search");
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.fcName}
          onChangeText={this.getHandler("fcName")}
          placeholder="Name Of The Food Center"
        />
        <TextInput
          style={styles.input}
          value={this.state.stallName}
          onChangeText={this.getHandler("stallName")}
          placeholder="Name Of The Stall"
        />

        <Button
          title="Create Stall"
          onPress={this.handleCreateStall}
          disabled={!this.state.isStallFormValid}
        />

        <TextInput
          style={styles.input}
          value={this.state.menuName}
          onChangeText={this.getHandler("menuName")}
          placeholder="Name Of The Food"
        />
        <TextInput
          style={styles.input}
          value={this.state.description}
          onChangeText={this.getHandler("description")}
          placeholder="Description Of The Food"
        />
        <TextInput
          style={styles.input}
          value={this.state.price}
          onChangeText={this.getHandler("price")}
          placeholder="Price Of The Food"
        />

        <Button
          title="Create Menu"
          onPress={this.handleCreateMenu}
          disabled={!this.state.isMenuFormValid}
        />

        <Text style={styles.text}> Press the Done Button To Leave Page </Text>
        <Button title="Done" onPress={this.handleDone} />
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
  text: {
    textAlign: "center",
    lineHeight: 30,
  },
});

const mapStateToProps = (state) => ({
  foodCentres: state.firestore.ordered.foodCentres,
  stalls: state.firestore.ordered.stalls,
  menus: state.firestore.ordered.menus,
  user: state.user,
});

export default compose(
  connect(mapStateToProps, {
    updateStallsData,
    updateMenusData,
    editStallsData,
    editMenusData,
  }),
  firestoreConnect([
    { collection: "foodCentres", orderBy: ["name", "asc"] },
    { collection: "stalls", orderBy: ["name", "asc"] },
    { collection: "menus", orderBy: ["name", "asc"] },
  ])
)(AddStallNMenuScreen);
