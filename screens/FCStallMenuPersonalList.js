import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { globalstyles } from "../styles/globalstyles";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { deleteMenusData } from "../app-redux/actions";

function FCStallMenuPersonalList(props) {
  const uid = props.user.userId;
  const stall = props.route.params.stall;
  const createdMenus = props.menus
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
            navigation.navigate("Edit Stall", { stall, isAddMenu: true })
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
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.setting}>
                <MaterialIcons
                  name="delete"
                  size={30}
                  style={styles.icon}
                  onPress={() => props.deleteMenusData(item)}
                />
                <AntDesign
                  name="edit"
                  size={30}
                  onPress={() =>
                    navigation.navigate("Edit Menu", {
                      stall: stall,
                      menu: item,
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
      <Text style={globalstyles.title}>Your Menus List is empty</Text>
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
  menus: state.menus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMenusData: (menu) => dispatch(deleteMenusData(menu)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FCStallMenuPersonalList);
