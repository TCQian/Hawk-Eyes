import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { globalstyles } from "../../styles/globalstyles";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { orderDone } from "../../app-redux/orderActions";

function FCStallOwnerOrderList(props) {
  const { profile, orderDone, Users } = props;

  if (!isLoaded(Users)) {
    return <Text>Loading...</Text>;
  }

  if (!profile.userId) {
    return null;
  }

  const orders = Users.filter((user) => user.userId === profile.userId)[0]
    .history;

  return orders.length !== 0 ? (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Button
              title="Done"
              onPress={() => orderDone([orders, item.key, profile.userId])}
            />
          </View>
        )}
      />
    </View>
  ) : (
    <View>
      <Text style={globalstyles.title}>There is no order yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    alignSelf: "center",
  },
  setting: {
    flexDirection: "row",
  },
});

const mapStateToProps = (state) => ({
  profile: state.firebase.profile,
  Users: state.firestore.ordered.Users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    orderDone: (arr) => dispatch(orderDone(arr)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "Users" }])
)(FCStallOwnerOrderList);
