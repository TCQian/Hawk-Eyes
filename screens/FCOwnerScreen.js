import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddFCScreen from "./AddFCScreen";
import PatronFoodCentre from "./PatronFoodCentre";

const Tab = createBottomTabNavigator();

function FCOwnerScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Search" component={PatronFoodCentre} />
            <Tab.Screen name="Create Food Centre" component={AddFCScreen} />
        </Tab.Navigator>
    );
}

export default FCOwnerScreen;
