import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { globalstyles } from "../../styles/globalstyles";
import { PATRON_USER } from "../../app-redux/actions";

class PatronSeat extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.foodCentre.name,
    });
  }

  render() {
    const { profile } = this.props;
    const { foodCentre } = this.props.route.params;
    return (
      <View>
        <Text>Available Seats: {foodCentre.capacity}</Text>
        {profile.userType == PATRON_USER ? (
          <View>
            <Button
              title="Book / Unbook Seat"
              onPress={() =>
                this.props.navigation.navigate("Seating Plan", {
                  foodCentre: foodCentre,
                })
              }
            />
          </View>
        ) : null}

        {!foodCentre.capacity && <Text>This Food Centre is full</Text>}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatronSeat);
