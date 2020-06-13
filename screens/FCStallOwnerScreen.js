import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddStallNMenuScreen from "./AddStallNMenuScreen";
import PatronFoodCentre from "./PatronFoodCentre";

const Tab = createBottomTabNavigator();

function FCStallOwnerScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Search" component={PatronFoodCentre} />
            <Tab.Screen
                name="Create Stall And Menu"
                component={AddStallNMenuScreen}
            />
        </Tab.Navigator>
    );
}

export default FCStallOwnerScreen;
