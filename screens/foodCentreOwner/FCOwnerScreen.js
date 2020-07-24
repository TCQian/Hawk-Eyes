import * as React from "react";
import { StyleSheet, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PatronFoodCentre from "../patron/PatronFoodCentre";
import FCOwnerPersonalList from "./FCOwnerPersonalList";
import { MaterialIcons } from "@expo/vector-icons";
import { globalstyles } from "../../styles/globalstyles";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";

const Tab = createBottomTabNavigator();

function FCOwnerScreen({ navigation }) {
    const signOutPress = () => {
        Alert.alert(
            "Signing Out...",
            "Are you sure you want to sign out?",
            [
                { text: "Yes", onPress: () => firebase.auth().signOut() },
                { text: "No" },
            ],
            { cancelable: false }
        );
    };
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialIcons
                    name="add"
                    size={30}
                    style={globalstyles.addIcon}
                    onPress={() => navigation.navigate("Add Food Centre")}
                />
            ),
            headerLeft: () => (
                <AntDesign
                    name="closecircle"
                    size={24}
                    style={globalstyles.signOutIcon}
                    color="black"
                    onPress={signOutPress}
                />
            ),
        });
    }, [navigation]);

    return (
        <Tab.Navigator>
            <Tab.Screen name="Search" component={PatronFoodCentre} />
            <Tab.Screen
                name="My Food Centres List"
                component={FCOwnerPersonalList}
            />
        </Tab.Navigator>
    );
}

export default FCOwnerScreen;
