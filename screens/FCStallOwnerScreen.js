import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import PatronFoodCentre from "./PatronFoodCentre";
import FCStallPersonalList from "./FCStallPersonalList";

const Tab = createBottomTabNavigator();

class FCStallOwnerScreen extends React.Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Search" component={PatronFoodCentre} />
        <Tab.Screen name="My Stalls List" component={FCStallPersonalList} />
      </Tab.Navigator>
    );
  }
}

export default FCStallOwnerScreen;
