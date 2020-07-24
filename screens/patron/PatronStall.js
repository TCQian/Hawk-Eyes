import React from "react";
import { Text, View, FlatList, TouchableOpacity, Button } from "react-native";
import { connect } from "react-redux";
import Card from "../../styles/cards";
import { globalstyles } from "../../styles/globalstyles";
import { getItemsByName, getItemsByParentKey } from "../../functions/functions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class PatronStall extends React.Component {
    componentDidMount() {
        this.props.navigation.setOptions({
            title: this.props.route.params.foodCentre.name,
        });
    }

    stalls() {
        const result = this.props.stalls;
        if (result) {
            return result.filter(
                (stall) =>
                    stall.parentId === this.props.route.params.foodCentre.id
            );
        } else {
            return [];
        }
    }

    render() {
        return (
            <View>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={this.stalls()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate("Menu", {
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

const mapStateToProps = (state) => {
    return {
        stalls: state.firestore.ordered.stalls,
        userType: state.userType,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "stalls", orderBy: ["name", "asc"] }])
)(PatronStall);
