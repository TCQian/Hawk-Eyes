import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import FCOwnerScreen from "./screens/FCOwnerScreen";
import FCStallOwnerScreen from "./screens/FCStallOwnerScreen";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Font } from "expo-font";
import PatronFoodCentre from "./screens/PatronFoodCentre";
import FoodCentreHome from "./screens/FoodCentreHome";
import PatronSeat from "./screens/PatronSeat";
import PatronStall from "./screens/PatronStall";
import StallMenu from "./screens/StallMenu";
import LoginScreen from "./screens/auth/LoginScreen";
import SignUpScreen from "./screens/auth/SignUpScreen";
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen";
import {
    FOODCENTRE_USER,
    STALL_USER,
    watchFoodCentresData,
    watchStallsData,
    watchMenusData,
    watchUserData,
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
        props.watchFoodCentresData();
        props.watchMenusData();
        props.watchStallsData();
        // listen to authentication
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = (user) => {
        this.setState({ isAuthenticationReady: true });
        this.setState({ isAuthenticated: !!user });
        if(user != null) {
            this.props.watchUserData(user);
        }
    };

    // Occurs when signout is pressed...
    onSignoutPress = () => {
        firebase.auth().signOut();
    };

    render() {
        if (this.state.isAuthenticated) {
            return (
                <Main
                    onSignoutPress={this.onSignoutPress}
                    userType={this.props.user.userType}
                />
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
                options={{ title: "Login" }}
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

const Main = (props) => (
    <View style={{ flex: 1 }}>
        <NavigationContainer>
            <ScreenStack.Navigator>
                {props.userType == FOODCENTRE_USER ? (
                    <ScreenStack.Screen
                        name="FCOwnerScreen"
                        component={FCOwnerScreen}
                        options={{ title: "Food Centre Owner" }}
                    />
                ) : null}
                {props.userType == STALL_USER ? (
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
                    name="Menu"
                    component={StallMenu}
                    options={{ title: "Menu" }}
                />
            </ScreenStack.Navigator>
        </NavigationContainer>
        <Button title="Sign out" onPress={props.onSignoutPress} />
    </View>
);

const mapStateToProps = (state) => ({
    user: state.user,
});

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
