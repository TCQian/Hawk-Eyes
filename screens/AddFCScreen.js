import React from "react";
import { connect } from "react-redux";
import { Button, StyleSheet, TextInput, View } from "react-native";
import Constants from "expo-constants";
import { getItemsByName } from "../functions/functions";
import { updateFoodCentresData } from "../app-redux/actions";

class AddFCScreen extends React.Component {
    handleSubmit = (formState) => {
        const length = this.props.foodCentres.length;
        this.props.updateFoodCentresData({
            name: formState.name,
            numberOfStalls: formState.numberOfStalls,
            capacity: formState.capacity,
            address: formState.address,
            key: length + 1,
        });

        this.props.navigation.navigate("Search");
    };

    render() {
        return (
            <AddFCForm
                onSubmit={this.handleSubmit}
                foodCentres={this.props.foodCentres}
            />
        );
    }
}

class AddFCForm extends React.Component {
    state = {
        name: "",
        numberOfStalls: "",
        capacity: "",
        address: "",
        isFormValid: false,
    };

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.name !== prevState.name ||
            this.state.numberOfStalls !== prevState.numberOfStalls ||
            this.state.capacity !== prevState.capacity ||
            this.state.address !== prevState.address
        ) {
            this.validateForm();
        }
    }

    validateForm = () => {
        if (
            this.state.name.length > 0 &&
            getItemsByName(this.props.foodCentres, this.state.name).length ==
                0 &&
            +this.state.numberOfStalls > 0 &&
            +this.state.capacity > 0 &&
            this.state.address.length > 0
        ) {
            this.setState({ isFormValid: true });
        } else {
            this.setState({ isFormValid: false });
        }
    };

    getHandler = (key) => (val) => {
        this.setState({ [key]: val });
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state);
        this.setState({
            name: "",
            numberOfStalls: "",
            capacity: "",
            address: "",
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={this.getHandler("name")}
                    placeholder="Name"
                />
                <TextInput
                    style={styles.input}
                    value={this.state.numberOfStalls}
                    onChangeText={this.getHandler("numberOfStalls")}
                    placeholder="Number Of Stalls"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={this.state.capacity}
                    onChangeText={this.getHandler("capacity")}
                    placeholder="Capacity"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={this.state.address}
                    onChangeText={this.getHandler("address")}
                    placeholder="Address"
                />
                <Button
                    title="Submit"
                    onPress={this.handleSubmit}
                    disabled={!this.state.isFormValid}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#ecf0f1",
        padding: 8,
    },
    input: {
        padding: 5,
        borderColor: "black",
        borderWidth: 1,
    },
});

const mapStateToProps = (state) => ({
    foodCentres: state.foodCentres,
});

export default connect(mapStateToProps, {
    updateFoodCentresData,
})(AddFCScreen);
