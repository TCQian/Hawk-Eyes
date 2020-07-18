import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { globalstyles } from "../../styles/globalstyles";
import Card from "../../styles/cards";
import { EvilIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class PatronFoodCentre extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
              setInput(val);
            }}
            //value={input}
            placeholder="Search Food Centre"
          />
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.props.foodCentres}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("FoodCentreHome", {
                  foodCentre: item,
                })
              }
            >
              <Card>
                <Text style={globalstyles.title}>{item.name}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "foodCentres", orderBy: ["name", "asc"] }])
)(PatronFoodCentre);
