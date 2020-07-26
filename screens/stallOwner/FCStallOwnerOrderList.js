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
import { connect } from "react-redux";
import { orderDone } from "../../app-redux/orderActions";
import { isLoaded } from "react-redux-firebase";

function FCStallOwnerOrderList(props) {
  const { profile, orderDone } = props;
  const orders = profile.history;

  if (!isLoaded(profile)) {
    return <Text>Loading...</Text>;
  }

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
});

const mapDispatchToProps = (dispatch) => {
  return {
    orderDone: (arr) => dispatch(orderDone(arr)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FCStallOwnerOrderList);
