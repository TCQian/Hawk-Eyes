import React from "react";
import { StyleSheet } from "react-native";

export const globalstyles = StyleSheet.create({
  title: {
    fontSize: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  foodCentreName: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  foodCentreBorder: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  addIcon: {
    marginRight: 15,
  },
  button: {
    borderWidth: 1,
    backgroundColor: "white",
  },
  signOutIcon: {
    marginLeft: 15,
  },
});
