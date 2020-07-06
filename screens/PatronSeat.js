import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { globalstyles } from "../styles/globalstyles";
import { getItemsByName } from "../functions/functions";
import { bookSeat, unbookSeat } from "../app-redux/seatsActions";
import { PATRON_USER } from "../app-redux/actions";

class PatronSeat extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.foodCentre.name,
    });
  }

  seats() {
    return getItemsByName(
      this.props.foodCentres,
      this.props.route.params.foodCentre.name
    )[0].capacity;
  }

  render() {
    const { user } = this.props;
    const { foodCentre } = this.props.route.params;
    return (
      <View>
        <Text>Available Seats: {this.seats()}</Text>
        {user.userType == PATRON_USER ? (
          <View>
            <Button
              title="Book Seat"
              onPress={() => this.props.bookSeat(foodCentre)}
            />
            <Button
              title="Unbook Seat"
              onPress={() => this.props.unbookSeat(foodCentre)}
            />
          </View>
        ) : null}

        {!this.seats() && <Text>This Food Centre is full</Text>}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  foodCentres: state.foodCentres,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    bookSeat: (foodCentre) => dispatch(bookSeat(foodCentre)),
    unbookSeat: (foodCentre) => dispatch(unbookSeat(foodCentre)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatronSeat);
