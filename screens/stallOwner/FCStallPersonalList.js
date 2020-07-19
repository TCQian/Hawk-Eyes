import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalstyles } from "../../styles/globalstyles";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { deleteStallsData } from "../../app-redux/actions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

function FCStallPersonalList(props) {
  const uid = props.user.userId;
  const createdStalls = props.stalls.filter((stall) => {
    return stall.createdBy === uid;
  });
  const { navigation } = props;

  return createdStalls.length !== 0 ? (
    <View>
      <FlatList
        data={createdStalls}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Menu Personal List", {
                stall: item,
              });
            }}
          >
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.setting}>
                <MaterialIcons
                  name="delete"
                  size={30}
                  style={styles.icon}
                  onPress={() => props.deleteStallsData(item.id)}
                />
                <AntDesign
                  name="edit"
                  size={30}
                  onPress={() =>
                    navigation.navigate("Edit Stall", {
                      stall: item,
                      isAddMenu: false,
                    })
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  ) : (
    <View>
      <Text style={globalstyles.title}>Your Stalls List is empty</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
  },
  setting: {
    flexDirection: "row",
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    marginTop: 20,
    flexDirection: "column",
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  stalls: state.firestore.ordered.stalls,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStallsData: (stall) => dispatch(deleteStallsData(stall)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "stalls", orderBy: ["name", "asc"] }])
)(FCStallPersonalList);
