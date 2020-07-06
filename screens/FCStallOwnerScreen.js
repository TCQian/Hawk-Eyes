import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import PatronFoodCentre from "./PatronFoodCentre";
import FCStallPersonalList from "./FCStallPersonalList";
import { MaterialIcons } from "@expo/vector-icons";
import { globalstyles } from "../styles/globalstyles";

const Tab = createBottomTabNavigator();

function FCStallOwnerScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          name="add"
          size={30}
          style={globalstyles.addIcon}
          onPress={() => navigation.navigate("Add Stall and Menu")}
        />
      ),
    });
  }, [navigation]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={PatronFoodCentre} />
      <Tab.Screen name="My Stalls List" component={FCStallPersonalList} />
    </Tab.Navigator>
  );
}

export default FCStallOwnerScreen;
