import { db } from "../firebase/firebaseConfig";
import * as firebase from "firebase";
import {
  FOODCENTRE_USER,
  STALL_USER,
  PATRON_USER,
  updateUserData,
} from "./actions";

export const ADD_PATRON_SEARCH_HISTORY = "ADD_PATRON_SEARCH_HISTORY";
export const ADD_CREATED_FOOD_CENTRE = "ADD_CREATED_FOOD_CENTRE";

export const addPatronSearchHistory = (foodCentreName) => {
  const user = firebase.auth().currentUser;

  return function (dispatch) {
    db.collection("Users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const { userType, history } = doc.data();
        let newHistory = [foodCentreName, ...history];
        if (userType == PATRON_USER) {
          db.collection("Users")
            .doc(user.uid)
            .update({
              history: newHistory,
            })
            .then(() => {
              dispatch({ type: ADD_PATRON_SEARCH_HISTORY, foodCentreName });
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
        } else {
          console.log("this user is not patron");
        }
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};
