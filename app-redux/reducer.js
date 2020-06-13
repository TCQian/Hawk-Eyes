import { combineReducers } from "redux";
import {
    UPDATE_FOODCENTRE,
    UPDATE_STALL,
    UPDATE_MENU,
    SET_FOODCENTRES_DATA,
    SET_STALLS_DATA,
    SET_MENUS_DATA,
    SET_USER,
    DELETE_FOODCENTRE,
    DELETE_STALL,
    DELETE_MENU,
} from "./actions";

const foodCentreReducer = (state = [], action) => {
    // this action type is associated with database
    if (action.type == UPDATE_FOODCENTRE) {
        return [...state, action.payload];
    }

    // this action type is associated with database
    if (action.type == SET_FOODCENTRES_DATA) {
        return action.payload;
    }

    // this action type is associated with database
    if (action.type == DELETE_FOODCENTRE) {
        return state.filter(function (value, index, arr) {
            return (
                value.name !== action.payload.name &&
                value.key !== action.payload.key
            );
        });
    }

    return state;
};

const stallReducer = (state = [], action) => {
    if (action.type == UPDATE_STALL) {
        return [...state, action.payload];
    }
    // this action type is associated with database
    if (action.type == SET_STALLS_DATA) {
        return action.payload;
    }

    if (action.type == DELETE_STALL) {
        return state.filter(function (value, index, arr) {
            return (
                value.name !== action.payload.name &&
                value.key !== action.payload.key
            );
        });
    }

    return state;
};

const menuReducer = (state = [], action) => {
    if (action.type == UPDATE_MENU) {
        return [...state, action.payload];
    }
    // this action type is associated with database
    if (action.type == SET_MENUS_DATA) {
        return action.payload;
    }

    if (action.type == DELETE_MENU) {
        return state.filter(function (value, index, arr) {
            return (
                value.name !== action.payload.name &&
                value.key !== action.payload.key
            );
        });
    }
    return state;
};

const userReducer = (state = {}, action) => {
    if (action.type == SET_USER) {
        return action.payload;
    }
    return state;
};

const reducer = combineReducers({
    foodCentres: foodCentreReducer,
    stalls: stallReducer,
    menus: menuReducer,
    user: userReducer,
});

export default reducer;
