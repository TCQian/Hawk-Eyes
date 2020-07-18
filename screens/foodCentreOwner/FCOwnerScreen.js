import * as React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PatronFoodCentre from "../patron/PatronFoodCentre";
import FCOwnerPersonalList from "./FCOwnerPersonalList";
import { MaterialIcons } from "@expo/vector-icons";
import { globalstyles } from "../../styles/globalstyles";

const Tab = createBottomTabNavigator();

function FCOwnerScreen({ navigation }) {
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
    });
  }, [navigation]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={PatronFoodCentre} />
      <Tab.Screen name="My Food Centres List" component={FCOwnerPersonalList} />
    </Tab.Navigator>
  );
}

export default FCOwnerScreen;
