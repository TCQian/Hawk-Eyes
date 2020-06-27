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
} from "./actions";
import { BOOK_SEAT, UNBOOK_SEAT } from "./seatsActions";
import {
  ADD_PATRON_SEARCH_HISTORY,
  ADD_CREATED_FOOD_CENTRE,
} from "./historyActions";

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
        value.name !== action.payload.name && value.key !== action.payload.key
      );
    });
  }

  if (action.type == EDIT_FOODCENTRE) {
    const editedFoodCentre = action.payload;
    const index = editedFoodCentre.key - 1;
    const newState = [...state];
    newState[index].name = editedFoodCentre.name;
    newState[index].numberOfStalls = editedFoodCentre.numberOfStalls;
    newState[index].capacity = editedFoodCentre.capacity;
    newState[index].address = editedFoodCentre.address;

    return newState;
  }

  if (action.type == BOOK_SEAT) {
    const newState = [...state];
    newState[action.index].capacity -= 1;
    return newState;
  }
  if (action.type == UNBOOK_SEAT) {
    const newState = [...state];
    newState[action.index].capacity += 1;
    return newState;
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
        value.name !== action.payload.name && value.key !== action.payload.key
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
        value.name !== action.payload.name && value.key !== action.payload.key
      );
    });
  }
  return state;
};

const userReducer = (state = {}, action) => {
  if (action.type == SET_USER) {
    return action.payload;
  }
  if (action.type == ADD_PATRON_SEARCH_HISTORY) {
    let newHistory = [];
    if (state.history === undefined) {
      newHistory = [action.foodCentreName];
    } else {
      newHistory = [action.foodCentreName, ...state.history];
    }
    return {
      ...state,
      history: newHistory,
    };
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
