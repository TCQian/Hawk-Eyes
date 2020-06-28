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
import { deleteFoodCentresData } from "../app-redux/actions";

class FCOwnerPersonalList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const uid = this.props.user.userId;
    const createdFoodCentres = this.props.foodCentres.filter((foodCentre) => {
      return foodCentre.createdBy === uid;
    });

    return createdFoodCentres.length !== 0 ? (
      <View>
        <FlatList
          data={createdFoodCentres}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.card}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={styles.setting}>
                  <MaterialIcons
                    name="delete"
                    size={30}
                    style={styles.icon}
                    onPress={() => this.props.deleteFoodCentresData(item)}
                  />
                  <AntDesign
                    name="edit"
                    size={30}
                    onPress={() =>
                      this.props.navigation.navigate("Edit Food Centre", {
                        foodCentre: item,
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
        <Text style={globalstyles.title}>Your Food Centres List is empty</Text>
      </View>
    );
  }
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
  foodCentres: state.foodCentres,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFoodCentresData: (foodCentre) =>
      dispatch(deleteFoodCentresData(foodCentre)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FCOwnerPersonalList);
