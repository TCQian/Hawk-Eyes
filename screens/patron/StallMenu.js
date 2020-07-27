import React from "react";
import { Text, View, FlatList, Button, Alert } from "react-native";
import { connect } from "react-redux";
import { getItemsByParentKey } from "../../functions/functions";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { PATRON_USER } from "../../app-redux/actions";
import { orderFood, patronOrderFood } from "../../app-redux/orderActions";

class StallMenu extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.stall.name,
    });
  }

  pressHandler = (arr) => {
    const profile = arr[0];
    const menu = arr[1];
    const stallOwner = arr[2];

    this.props.orderFood([profile.userId, menu, stallOwner]);
    this.props.patronOrderFood([profile, menu]);
    Alert.alert("Your food has been ordered");
  };

  render() {
    const { menus, profile, Users } = this.props;

    if (!isLoaded(menus)) {
      return <Text>Loading ...</Text>;
    }

    if (!isLoaded(Users)) {
      return <Text>Loading ...</Text>;
    }

    const stallOwner = Users.filter(
      (user) => user.userId === this.props.route.params.stall.createdBy
    )[0];

    const filteredMenus = getItemsByParentKey(
      menus,
      this.props.route.params.stall.id
    );

    let index = 1;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(item) => item.id}
          data={filteredMenus}
          renderItem={({ item }) => (
            <View style={{ marginTop: 15 }}>
              <Text>No: {index++}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Price: {item.price}</Text>
              {profile.userType === PATRON_USER ? (
                <View>
                  <Button
                    title="Order"
                    onPress={() =>
                      this.pressHandler([profile, item, stallOwner])
                    }
                  />
                </View>
              ) : null}
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menus: state.firestore.ordered.menus,
    profile: state.firebase.profile,
    Users: state.firestore.ordered.Users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderFood: (arr) => dispatch(orderFood(arr)),
    patronOrderFood: (arr) => dispatch(patronOrderFood(arr)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "menus", orderBy: ["name", "asc"] },
    { collection: "Users" },
  ])
)(StallMenu);
