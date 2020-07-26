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
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { deleteMenusData } from "../../app-redux/actions";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";

function FCStallMenuPersonalList(props) {
  const uid = props.profile.userId;
  const stall = props.route.params.stall;
  const { menus } = props;

  if (!isLoaded(menus)) {
    return <Text>Loading ...</Text>;
  }

  const createdMenus = menus
    .filter((menu) => {
      return menu.createdBy === uid;
    })
    .filter((menu) => {
      return menu.parentKey === stall.key;
    });
  const { navigation } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          name="add"
          size={30}
          style={globalstyles.addIcon}
          onPress={() =>
            navigation.navigate("Edit Stall", {
              stall,
              isAddMenu: true,
            })
          }
        />
      ),
      title: props.route.params.stall.name,
    });
  }, [navigation]);

  return createdMenus.length !== 0 ? (
    <View>
      <FlatList
        data={createdMenus}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.card}>
              <Text style={globalstyles.title}>{item.name}</Text>
              <View style={styles.iconSpacing}>
                <AntDesign
                  name="edit"
                  size={30}
                  style={styles.icon}
                  onPress={() =>
                    navigation.navigate("Edit Menu", {
                      stall: stall,
                      menu: item,
                    })
                  }
                />
                <MaterialIcons
                  name="event-seat"
                  style={styles.icon}
                  size={33}
                  color="black"
                  onPress={() =>
                    navigation.navigate("Seating Plan", {
                      foodCentre: item,
                    })
                  }
                />
                <MaterialIcons
                  name="delete"
                  size={33}
                  style={styles.icon}
                  onPress={() => props.deleteMenusData(item.id)}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  ) : (
    <View style={styles.title}>
      <Text>Your Menus List is empty</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    margin: 8,
    padding: 3,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  iconSpacing: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    flexDirection: "row",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => ({
  profile: state.firebase.profile,
  menus: state.firestore.ordered.menus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMenusData: (menu) => dispatch(deleteMenusData(menu)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "menus", orderBy: ["name", "asc"] }])
)(FCStallMenuPersonalList);
