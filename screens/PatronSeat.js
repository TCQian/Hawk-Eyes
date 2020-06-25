import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { globalstyles } from "../styles/globalstyles";
import { getItemsByName } from "../functions/functions";
import { bookSeat, unbookSeat } from "../app-redux/seatsActions";

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
    const index = this.props.route.params.foodCentreArrayIndex;
    console.log(index);
    return (
      <View>
        <Text>Seats: {this.seats()}</Text>
        <Button title="Book Seat" onPress={() => this.props.bookSeat(index)} />
        <Button
          title="Unbook Seat"
          onPress={() => this.props.unbookSeat(index)}
        />

        {!this.seats() && <Text>This Food Centre is full</Text>}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  foodCentres: state.foodCentres,
});

const mapDispatchToProps = (dispatch) => {
  return {
    bookSeat: (index) => dispatch(bookSeat(index)),
    unbookSeat: (index) => dispatch(unbookSeat(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatronSeat);
