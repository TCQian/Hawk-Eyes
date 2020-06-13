import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import Card from "../styles/cards";
import { globalstyles } from "../styles/globalstyles";
import { connect } from "react-redux";
import { deleteFoodCentresData, FOODCENTRE_USER } from "../app-redux/actions";

class FoodCentreHome extends React.Component {
    // delete this foodCentre from database
    handleDelete = () => {
        this.props.deleteFoodCentresData(this.props.route.params.foodCentre);
        this.props.navigation.navigate("Search");
    };

    render() {
        return (
            <View>
                <View style={globalstyles.foodCentreBorder}>
                    <Text style={globalstyles.foodCentreName}>
                        {this.props.route.params.name}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate("Seats", {
                            foodCentreName: this.props.route.params.name,
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
                {
                    // only food centre owner can delete the food centre
                }
                {this.props.user.userType == FOODCENTRE_USER ? (
                    <Button title="Delete" onPress={this.handleDelete} />
                ) : null}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {
    deleteFoodCentresData,
})(FoodCentreHome);
