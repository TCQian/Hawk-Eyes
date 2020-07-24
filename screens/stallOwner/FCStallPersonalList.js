import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { globalstyles } from "../../styles/globalstyles";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { deleteStallsData } from "../../app-redux/actions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

function FCStallPersonalList(props) {
    const uid = props.user.userId;
    let createdStalls = [];
    if (props.stalls) {
        createdStalls = props.stalls.filter((stall) => {
            return stall.createdBy === uid;
        });
    }
    const { navigation } = props;

    return createdStalls.length !== 0 ? (
        <View>
            <FlatList
                data={createdStalls}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Menu Personal List", {
                                stall: item,
                            });
                        }}
                    >
                        <View style={styles.card}>
                            <Text style={globalstyles.title}>{item.name}</Text>
                            <View style={styles.iconSpacing}>
                                <AntDesign
                                    name="edit"
                                    size={30}
                                    style={styles.icon}
                                    onPress={() =>
                                        navigation.navigate("Edit Stall", {
                                            stall: item,
                                            isAddMenu: false,
                                        })
                                    }
                                />
                                <MaterialIcons
                                    name="event-seat"
                                    style={styles.icon}
                                    size={33}
                                    color="black"
                                    onPress={() =>
                                        navigation.navigate("Seating Plan", {
                                            foodCentre: { id: item.parentId },
                                        })
                                    }
                                />
                                <MaterialIcons
                                    name="delete"
                                    size={33}
                                    style={styles.icon}
                                    onPress={() =>
                                        props.deleteStallsData(item.id)
                                    }
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    ) : (
        <View style={styles.title}>
            <Text>Your Stalls List is empty</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        alignSelf: "center",
        margin: 8,
        padding: 3,
        borderWidth: 1,
    },
    title: {
        fontSize: 20,
        height: "100%",
        justifyContent: "center",
        alignSelf: "center",
    },
    iconSpacing: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
    },
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
});

const mapStateToProps = (state) => ({
    user: state.user,
    stalls: state.firestore.ordered.stalls,
});

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStallsData: (stall) => dispatch(deleteStallsData(stall)),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: "stalls", orderBy: ["name", "asc"] }])
)(FCStallPersonalList);
