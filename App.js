import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import store from "./app-redux/Store";
import MainApp from "./MainApp";
// ----- added LoC to resolve can't find variable "atob" firestore error ------//
import { decode, encode } from "base-64";
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}
//--------------------------------------------------------------------------//

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MainApp />
            </Provider>
        );
    }
}
