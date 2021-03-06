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
import { orderDone, patronOrderDone } from "../../app-redux/orderActions";

function FCStallOwnerOrderList(props) {
  const { profile, orderDone, patronOrderDone } = props;

  if (!profile.userId) {
    return null;
  }

  const orders = profile.history;

  const handlePress = (arr) => {
    orderDone(arr);
    patronOrderDone(arr);
  };

  return orders.length !== 0 ? (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Button
              title="Done"
              onPress={() => handlePress([orders, item, profile.userId])}
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    orderDone: (arr) => dispatch(orderDone(arr)),
    patronOrderDone: (arr) => dispatch(patronOrderDone(arr)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "Users" }])
)(FCStallOwnerOrderList);
