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

function PatronOrderList(props) {
  const { profile } = props;

  if (!profile.userId) {
    return null;
  }

  const orders = profile.history;

  return orders.length !== 0 ? (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  ) : (
    <View>
      <Text style={globalstyles.title}>You have not ordered anything yet</Text>
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    orderDone: (arr) => dispatch(orderDone(arr)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "Users" }])
)(PatronOrderList);
