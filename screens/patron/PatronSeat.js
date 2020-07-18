import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { globalstyles } from "../../styles/globalstyles";
import { bookSeat, unbookSeat } from "../../app-redux/seatsActions";
import { PATRON_USER } from "../../app-redux/actions";

class PatronSeat extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.foodCentre.name,
    });
  }

  render() {
    const { user } = this.props;
    const { foodCentre } = this.props.route.params;
    return (
      <View>
        <Text>Available Seats: {foodCentre.capacity}</Text>
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

        {!foodCentre.capacity && <Text>This Food Centre is full</Text>}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    bookSeat: (foodCentre) => dispatch(bookSeat(foodCentre)),
    unbookSeat: (foodCentre) => dispatch(unbookSeat(foodCentre)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatronSeat);
