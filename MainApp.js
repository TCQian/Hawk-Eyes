import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import FCOwnerScreen from "./screens/foodCentreOwner/FCOwnerScreen";
import FCStallOwnerScreen from "./screens/stallOwner/FCStallOwnerScreen";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Font } from "expo-font";
import PatronFoodCentre from "./screens/patron/PatronFoodCentre";
import FoodCentreHome from "./screens/patron/FoodCentreHome";
import PatronSeat from "./screens/patron/PatronSeat";
import PatronStall from "./screens/patron/PatronStall";
import StallMenu from "./screens/patron/StallMenu";
import LoginScreen from "./screens/auth/LoginScreen";
import SignUpScreen from "./screens/auth/SignUpScreen";
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen";
import AddFCScreen from "./screens/foodCentreOwner/AddFCScreen";
import FCOwnerPersonalList from "./screens/foodCentreOwner/FCOwnerPersonalList";
import EditFCScreen from "./screens/foodCentreOwner/EditFCScreen";
import SeatingPlan from "./screens/foodCentreOwner/SeatingPlan";
import AddStallNMenuScreen from "./screens/stallOwner/AddStallNMenuScreen";
import FCStallPersonalList from "./screens/stallOwner/FCStallPersonalList";
import FCStallMenuPersonalList from "./screens/stallOwner/FCStallMenuPersonalList";
import EditStallScreen from "./screens/stallOwner/EditStallScreen";
import EditMenuScreen from "./screens/stallOwner/EditMenuScreen";

import {
    FOODCENTRE_USER,
    STALL_USER,
    PATRON_USER,
    watchFoodCentresData,
    watchStallsData,
    watchMenusData,
    watchUserData,
    setUserData,
} from "./app-redux/actions";
import { connect } from "react-redux";
import * as firebase from "firebase";

const ScreenStack = createStackNavigator();

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingComplete: false,
            isAuthenticationReady: false,
            isAuthenticated: false,
        };
        //props.watchFoodCentresData();
        //props.watchMenusData();
        //props.watchStallsData();
        // listen to authentication
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = (user) => {
        if (user != null) {
            this.props.watchUserData(user);
            if (user) {
                this.setState({ isAuthenticationReady: true });
                this.setState({ isAuthenticated: !!user });
            }
        } else {
            setUserData(null);
            this.setState({ isAuthenticationReady: false });
            this.setState({ isAuthenticated: false });
        }
    };

    // Occurs when signout is pressed...
    onSignoutPress = () => {
        Alert.alert(
            "Signing Out...",
            "Are you sure you want to sign out?",
            [
                { text: "Yes", onPress: () => firebase.auth().signOut() },
                { text: "No" },
            ],
            { cancelable: false }
        );
    };

    render() {
        if (this.state.isAuthenticated && this.props.user.userType) {
            return (
                <View style={{ flex: 1 }}>
                    <NavigationContainer>
                        <ScreenStack.Navigator>
                            {this.props.user.userType == FOODCENTRE_USER ? (
                                <ScreenStack.Screen
                                    name="FCOwnerScreen"
                                    component={FCOwnerScreen}
                                    options={{ title: "Food Centre Owner" }}
                                />
                            ) : null}

                            {this.props.user.userType == STALL_USER ? (
                                <ScreenStack.Screen
                                    name="FCStallOwnerScreen"
                                    component={FCStallOwnerScreen}
                                    options={{ title: "Stall Owner" }}
                                />
                            ) : null}

                            <ScreenStack.Screen
                                name="PatronFoodCentre"
                                component={PatronFoodCentre}
                                options={{ title: "Food Centre" }}
                            />

                            <ScreenStack.Screen
                                name="FoodCentreHome"
                                component={FoodCentreHome}
                                options={{ title: "Food Centre Details" }}
                            />

                            <ScreenStack.Screen
                                name="Add Food Centre"
                                component={AddFCScreen}
                                options={{ title: "Add Food Centre" }}
                            />
                            <ScreenStack.Screen
                                name="Seats"
                                component={PatronSeat}
                                options={{ title: "Seats" }}
                            />
                            <ScreenStack.Screen
                                name="Stalls"
                                component={PatronStall}
                                options={{ title: "Stalls" }}
                            />

                            <ScreenStack.Screen
                                name="Stall Personal List"
                                component={FCStallPersonalList}
                                options={{ title: "My Stall List" }}
                            />
                            <ScreenStack.Screen
                                name="Menu"
                                component={StallMenu}
                                options={{ title: "Menu" }}
                            />

                            <ScreenStack.Screen
                                name="Edit Food Centre"
                                component={EditFCScreen}
                                options={{ title: "Edit Food Centre" }}
                            />
                            <ScreenStack.Screen
                                name="Add Stall and Menu"
                                component={AddStallNMenuScreen}
                                options={{ title: "Add Stall and Menu" }}
                            />
                            <ScreenStack.Screen
                                name="Menu Personal List"
                                component={FCStallMenuPersonalList}
                                options={{ title: "My Menu List" }}
                            />
                            <ScreenStack.Screen
                                name="Edit Stall"
                                component={EditStallScreen}
                                options={{ title: "Edit Stall" }}
                            />
                            <ScreenStack.Screen
                                name="Edit Menu"
                                component={EditMenuScreen}
                                options={{ title: "Edit Menu" }}
                            />
                            <ScreenStack.Screen
                                name="Seating Plan"
                                component={SeatingPlan}
                                options={{ title: "Seating Plan" }}
                            />
                        </ScreenStack.Navigator>
                    </NavigationContainer>
                </View>
            ); // user information can be passed in to handle user database
        } else {
            return <Authentication />;
        }
    }

    /*
    if (
            (!this.state.isLoadingComplete ||
                !this.state.isAuthenticationReady) &&
            !this.props.skipLoadingScreen
        ) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require("./assets/images/robot-dev.png"),
                require("./assets/images/robot-prod.png"),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
            }),
        ]);
    };

    _handleLoadingError = (error) => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
    */
}

const Authentication = (props) => (
    <NavigationContainer>
        <ScreenStack.Navigator>
            <ScreenStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ title: "HawkEyes" }}
            />
            <ScreenStack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ title: "Sign Up" }}
            />
            <ScreenStack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={{ title: "Forgot Password?" }}
            />
        </ScreenStack.Navigator>
    </NavigationContainer>
);

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        watchFoodCentresData: () => {
            dispatch(watchFoodCentresData());
        },
        watchMenusData: () => {
            dispatch(watchMenusData());
        },
        watchStallsData: () => {
            dispatch(watchStallsData());
        },
        watchUserData: (user) => {
            dispatch(watchUserData(user));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
