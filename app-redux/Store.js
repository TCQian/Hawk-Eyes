import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
import { getFirestore, reduxFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";
import { firebaseConfig } from "../firebase/firebaseConfig";

const DEFAULT_STATE = {
  foodCentres: [
    {
      name: "Zion Riverside Food Centre",
      numberOfStalls: 32,
      capacity: 100,
      address: "70, Zion Road, S(247792)",
      key: "1",
    },
    {
      name: "Tiong Bahru Market",
      numberOfStalls: 342,
      capacity: 100,
      address: "30, Seng Poh Road, S(168898)",
      key: "2",
    },
    {
      name: "Tekka Market",
      numberOfStalls: 403,
      capacity: 100,
      address: "Blk 665, Buffalo Road, S(210665)",
      key: "3",
    },
  ],
  stalls: [
    {
      name: "Chicken Rice",
      parentKey: "1",
      key: "1",
    },
    {
      name: "Western",
      parentKey: "2",
      key: "2",
    },
    {
      name: "Mala",
      parentKey: "2",
      key: "3",
    },
    {
      name: "Japanese",
      parentKey: "3",
      key: "4",
    },
  ],
  menus: [
    {
      name: "chicken rice",
      description: "Tasty chicken and delicious soup",
      price: "4",
      parentKey: "1",
      key: "1",
    },
    {
      name: "chicken chop",
      description: "Chicken with crispy fries",
      price: "5.50",
      parentKey: "2",
      key: "2",
    },
    {
      name: "steak",
      description: "Angus Beef",
      price: "10",
      parentKey: "2",
      key: "3",
    },
    {
      name: "spicy",
      description: "Authentic mala dish",
      price: "5",
      parentKey: "3",
      key: "4",
    },
    {
      name: "sushi",
      description: "Fresh fish delivered from Japan",
      price: "2",
      parentKey: "4",
      key: "5",
    },
    {
      name: "ramen",
      description: "Best ramen in town",
      price: "7",
      parentKey: "4",
      key: "6",
    },
  ],
};

//attachAuthIsReady is to make sure that the user has been logged in then render the App
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
