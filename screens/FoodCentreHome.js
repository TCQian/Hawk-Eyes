import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import Card from "../styles/cards";
import { globalstyles } from "../styles/globalstyles";
import { connect } from "react-redux";
import { deleteFoodCentresData, FOODCENTRE_USER } from "../app-redux/actions";
import { addPatronSearchHistory } from "../app-redux/historyActions";
import { PATRON_USER } from "../app-redux/actions";

class FoodCentreHome extends React.Component {
  componentDidMount() {
    const foodCentreName = this.props.route.params.name;
    const { user } = this.props;
    this.props.navigation.setOptions({
      title: foodCentreName,
    });
    if (user.type == PATRON_USER) {
      this.props.addPatronSearchHistory(foodCentreName);
    }
  }

  // delete this foodCentre from database
  handleDelete = () => {
    this.props.deleteFoodCentresData(this.props.route.params.foodCentre);
    this.props.navigation.navigate("Search");
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Seats", {
              foodCentre: this.props.route.params.foodCentre,
            })
          }
        >
          <Card>
            <Text style={globalstyles.title}>Seats</Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Stalls", {
              foodCentreName: this.props.route.params.name,
            })
          }
        >
          <Card>
            <Text style={globalstyles.title}>Stalls</Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addPatronSearchHistory: (foodCentreName) =>
      dispatch(addPatronSearchHistory(foodCentreName)),
    deleteFoodCentresData: (foodCentre) =>
      dispatch(deleteFoodCentresData(foodCentre)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodCentreHome);
