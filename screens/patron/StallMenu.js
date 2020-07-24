import React from "react";
import { Text, View, FlatList, Button } from "react-native";
import { connect } from "react-redux";
import { getItemsByParentKey } from "../../functions/functions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class StallMenu extends React.Component {
    componentDidMount() {
        this.props.navigation.setOptions({
            title: this.props.route.params.stall.name,
        });
    }

    menus() {
        const result = this.props.menus;
        if (result) {
            return getItemsByParentKey(
                this.props.menus,
                this.props.route.params.stall.id
            );
        } else {
            return [];
        }
    }

    render() {
        let index = 1;
        return (
            <View>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={this.menus()}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                marginTop: 15,
                                backgroundColor: "beige",
                                borderWidth: 5,
                                padding: 10,
                            }}
                        >
                            <Text>Item No: {index++}</Text>
                            <Text>Name: {item.name}</Text>
                            <Text>Description: {item.description}</Text>
                            <Text>Price: {item.price}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    menus: state.firestore.ordered.menus,
    user: state.user,
});

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "menus", orderBy: ["name", "asc"] }])
)(StallMenu);
