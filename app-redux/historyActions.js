import { db } from "../firebase/firebaseConfig";
import { addSearchHistory } from "../functions/functions";

export const ADD_PATRON_SEARCH_HISTORY = "ADD_PATRON_SEARCH_HISTORY";

export const addPatronSearchHistory = (arr) => {
  const profile = arr[0];
  const foodCentreName = arr[1];
  const { userId } = profile;
  const newHistory = addSearchHistory(foodCentreName, profile.history);

  return function (dispatch) {
    db.collection("Users")
      .doc(userId)
      .update({
        history: newHistory,
      })
      .then(function () {
        dispatch({ type: ADD_PATRON_SEARCH_HISTORY });
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};
