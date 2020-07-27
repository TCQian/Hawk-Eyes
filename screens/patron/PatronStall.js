import React from "react";
import { Text, View, FlatList, TouchableOpacity, Button } from "react-native";
import { connect } from "react-redux";
import Card from "../../styles/cards";
import { globalstyles } from "../../styles/globalstyles";
import { getItemsByName, getItemsByParentKey } from "../../functions/functions";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";

class PatronStall extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.foodCentre.name,
    });
  }

  render() {
    const { stalls } = this.props;

    if (!isLoaded(stalls)) {
      return <Text>Loading ...</Text>;
    }

    const filteredStalls = stalls.filter(
      (stall) => stall.parentId === this.props.route.params.foodCentre.id
    );
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(item) => item.id}
          data={filteredStalls}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Menu", {
                  stall: item,
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

const mapStateToProps = (state) => {
  return {
    stalls: state.firestore.ordered.stalls,
    userType: state.userType,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "stalls", orderBy: ["name", "asc"] }])
)(PatronStall);
