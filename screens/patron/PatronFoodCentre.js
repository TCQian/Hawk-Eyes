import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { globalstyles } from "../../styles/globalstyles";
import Card from "../../styles/cards";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import * as firebase from "firebase";
import { addPatronSearchHistory } from "../../app-redux/historyActions";

function PatronFoodCentre(props) {
  const { navigation, profile, foodCentres } = props;
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

  const pressHandler = (foodCentre) => {
    const { profile } = props;
    if (profile.userType === "PATRON_USER") {
      props.addPatronSearchHistory([profile, foodCentre.name]);
    }
    props.navigation.navigate("FoodCentreHome", {
      foodCentre,
    });
    return undefined;
  };

  if (!isLoaded(foodCentres)) {
    return <Text>Loading ...</Text>;
  }

  return (
    <View>
      <View style={styles.searchBar}>
        <EvilIcons name="search" size={35} />

        <TextInput
          style={{
            width: 250,
            height: 35,
            borderColor: "black",
            borderWidth: 1,
          }}
          onChangeText={(val) => {
            //setInput(val);
          }}
          //value={input}
          placeholder="Search Food Centre"
        />
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        data={props.foodCentres}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => pressHandler(item)}>
            <Card>
              <Text style={globalstyles.title}>{item.name}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {},
  searchBar: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    foodCentres: state.firestore.ordered.foodCentres,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPatronSearchHistory: (foodCentreName) =>
      dispatch(addPatronSearchHistory(foodCentreName)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "foodCentres", orderBy: ["name", "asc"] }])
)(PatronFoodCentre);
