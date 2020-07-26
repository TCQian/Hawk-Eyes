import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Alert } from "react-native";
import PatronFoodCentre from "../patron/PatronFoodCentre";
import FCStallPersonalList from "./FCStallPersonalList";
import FCStallOwnerOrderList from "./FCStallOwnerOrderList";
import { globalstyles } from "../../styles/globalstyles";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";

const Tab = createBottomTabNavigator();

function FCStallOwnerScreen({ navigation }) {
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
          onPress={() => navigation.navigate("Add Stall and Menu")}
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
      <Tab.Screen name="My Orders" component={FCStallOwnerOrderList} />
      <Tab.Screen name="My Stalls List" component={FCStallPersonalList} />
    </Tab.Navigator>
  );
}

export default FCStallOwnerScreen;
