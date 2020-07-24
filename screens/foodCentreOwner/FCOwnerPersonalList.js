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
import { deleteFoodCentresData } from "../../app-redux/actions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

function FCOwnerPersonalList(props) {
    const uid = props.user.userId;
    const createdFoodCentres = props.foodCentres.filter((foodCentre) => {
        return foodCentre.createdBy === uid;
    });
    const { navigation } = props;

    return createdFoodCentres.length !== 0 ? (
        <View>
            <FlatList
                data={createdFoodCentres}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <View style={styles.card}>
                            <Text style={globalstyles.title}>{item.name}</Text>
                            <View style={styles.iconSpacing}>
                                <AntDesign
                                    name="edit"
                                    size={30}
                                    style={styles.icon}
                                    onPress={() =>
                                        navigation.navigate(
                                            "Edit Food Centre",
                                            {
                                                foodCentre: item,
                                            }
                                        )
                                    }
                                />
                                <MaterialIcons
                                    name="event-seat"
                                    style={styles.icon}
                                    size={33}
                                    color="black"
                                    onPress={() =>
                                        navigation.navigate("Seating Plan", {
                                            foodCentre: item,
                                        })
                                    }
                                />
                                <MaterialIcons
                                    name="delete"
                                    size={33}
                                    style={styles.icon}
                                    onPress={() =>
                                        props.deleteFoodCentresData(item)
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
            <Text>Your Food Centres List is empty</Text>
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
    foodCentres: state.firestore.ordered.foodCentres,
});

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFoodCentresData: (foodCentre) =>
            dispatch(deleteFoodCentresData(foodCentre)),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: "foodCentres", orderBy: ["name", "asc"] }])
)(FCOwnerPersonalList);
