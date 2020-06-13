import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { globalstyles } from "../styles/globalstyles";
import { getItemsByName } from "../functions/functions";

class PatronSeat extends React.Component {
    seats() {
        return getItemsByName(
            this.props.foodCentres,
            this.props.route.params.foodCentreName
        )[0].capacity;
    }

    render() {
        return (
            <View>
                <View style={globalstyles.foodCentreBorder}>
                    <Text style={globalstyles.foodCentreName}>
                        {this.props.route.params.name}
                    </Text>
                </View>
                <Text>Seats: {this.seats()}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    foodCentres: state.foodCentres,
});

export default connect(mapStateToProps)(PatronSeat);
