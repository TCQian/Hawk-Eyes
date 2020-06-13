import React from "react";
import { Text, View, FlatList, Button } from "react-native";
import { connect } from "react-redux";
import { getItemsByParentKey } from "../functions/functions";
import {
    STALL_USER,
    FOODCENTRE_USER,
    deleteMenusData,
    deleteStallsData,
} from "../app-redux/actions";

class StallMenu extends React.Component {
    menus() {
        return getItemsByParentKey(
            this.props.menus,
            this.props.route.params.parentKey
        );
    }

    handleDeleteStall = () => {
        this.props.deleteStallsData(this.props.route.params.stall);
        // should also delete all the menus
        this.props.navigation.navigate("Search");
    };

    handleDeleteMenu = (item) => () => {
        this.props.deleteMenusData(item);
    };

    render() {
        let index = 1;
        return (
            <View>
                <FlatList
                    data={this.menus()}
                    renderItem={({ item }) => (
                        <View style={{ marginTop: 15 }}>
                            <Text>No: {index++}</Text>
                            <Text>Name: {item.name}</Text>
                            <Text>Description: {item.description}</Text>
                            <Text>Price: {item.price}</Text>
                            {this.props.user.userType == STALL_USER ? (
                                <Button
                                    title="Delete Menu"
                                    onPress={this.handleDeleteMenu(item)}
                                />
                            ) : null}
                        </View>
                    )}
                />
                {this.props.user.userType == FOODCENTRE_USER ||
                this.props.user.userType == STALL_USER ? (
                    <Button
                        title="Delete Stall"
                        onPress={this.handleDeleteStall}
                        color="red"
                        style={{ borderWidth: 1 }}
                    />
                ) : null}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    menus: state.menus,
    user: state.user,
});

export default connect(mapStateToProps, { deleteMenusData, deleteStallsData })(
    StallMenu
);
