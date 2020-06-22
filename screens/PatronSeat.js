import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { globalstyles } from "../styles/globalstyles";
import { getItemsByName } from "../functions/functions";

class PatronSeat extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.foodCentreName,
    });
  }

  seats() {
    return getItemsByName(
      this.props.foodCentres,
      this.props.route.params.foodCentreName
    )[0].capacity;
  }

  render() {
    return (
      <View>
        <Text>Seats: {this.seats()}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  foodCentres: state.foodCentres,
});

export default connect(mapStateToProps)(PatronSeat);
