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
  EDIT_FOODCENTRE,
  EDIT_STALL,
  EDIT_MENU,
  SET_SEATINGPLAN_DATA,
  PATRON_USER,
} from "./actions";
import { ADD_PATRON_SEARCH_HISTORY } from "./historyActions";
import { ORDER_FOOD, ORDER_DONE } from "./orderActions";

import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { generateGrid } from "../screens/foodCentreOwner/SeatingPlan";

const foodCentreReducer = (state = [], action) => {
  // this action type is associated with database
  if (action.type == UPDATE_FOODCENTRE) {
    return state;
  }

  // this action type is associated with database
  if (action.type == SET_FOODCENTRES_DATA) {
    return action.payload;
  }

  // this action type is associated with database
  if (action.type == DELETE_FOODCENTRE) {
    return state;
  }

  if (action.type == EDIT_FOODCENTRE) {
    return state;
  }

  return state;
};

const stallReducer = (state = [], action) => {
  if (action.type == UPDATE_STALL) {
    return state;
  }
  // this action type is associated with database
  if (action.type == SET_STALLS_DATA) {
    return action.payload;
  }

  if (action.type == DELETE_STALL) {
    return state;
  }

  if (action.type == EDIT_STALL) {
    return state;
  }

  return state;
};

const menuReducer = (state = [], action) => {
  if (action.type == UPDATE_MENU) {
    return state;
  }
  // this action type is associated with database
  if (action.type == SET_MENUS_DATA) {
    return action.payload;
  }

  if (action.type == DELETE_MENU) {
    return state;
  }

  if (action.type == EDIT_MENU) {
    return state;
  }
  return state;
};

const userReducer = (state = {}, action) => {
  if (action.type == SET_USER) {
    return action.payload;
  }
  if (action.type == ADD_PATRON_SEARCH_HISTORY) {
    return state;
  }
  if (action.type == ORDER_FOOD) {
    return state;
  }
  if (action.type == ORDER_DONE) {
    return state;
  }
  return state;
};

const seatingPlanReducer = (state = {}, action) => {
  if (action.type == SET_SEATINGPLAN_DATA) {
    if (action.payload != null) {
      return action.payload;
    } else {
      return generateGrid(420);
    }
  }
  return state;
};

const reducer = combineReducers({
  foodCentres: foodCentreReducer,
  stalls: stallReducer,
  menus: menuReducer,
  seatingPlanGrid: seatingPlanReducer,
  user: userReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default reducer;
