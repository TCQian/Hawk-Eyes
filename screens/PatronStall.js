import React from "react";
import { Text, View, FlatList, TouchableOpacity, Button } from "react-native";
import { connect } from "react-redux";
import Card from "../styles/cards";
import { globalstyles } from "../styles/globalstyles";
import { getItemsByName, getItemsByParentKey } from "../functions/functions";

class PatronStall extends React.Component {
    getFoodCentreKey() {
        return getItemsByName(
            this.props.foodCentres,
            this.props.route.params.foodCentreName
        )[0].key;
    }

    stalls() {
        return getItemsByParentKey(this.props.stalls, this.getFoodCentreKey());
    }

    render() {
        return (
            <View>
                <View style={globalstyles.foodCentreBorder}>
                    <Text style={globalstyles.foodCentreName}>
                        {this.props.route.params.foodCentreName}
                    </Text>
                </View>
                <FlatList
                    data={this.stalls()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate("Menu", {
                                    parentKey: item.key,
                                    stall: item,
                                })
                            }
                        >
                            <Card>
                                <Text style={globalstyles.title}>
                                    {item.name}
                                </Text>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    foodCentres: state.foodCentres,
    stalls: state.stalls,
    userType: state.userType,
});

export default connect(mapStateToProps)(PatronStall);
