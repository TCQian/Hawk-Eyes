import db from "../firebase/firebaseConfig";
import * as firebase from "firebase";

export const BOOK_SEAT = "BOOK_SEAT";
export const UNBOOK_SEAT = "UNBOOK_SEAT";

export const bookSeat = (index) => {
  return function (dispatch) {
    let foodCentre = null;

    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .get()
      .then((doc) => {
        const { foodCentres, menus, stalls } = doc.data();

        if (foodCentres[index].capacity === 0) {
          return null;
        }
        foodCentres[index].capacity = foodCentres[index].capacity - 1;

        db.collection("Database")
          .doc("F8ZKbAihxgnysKPDSP3L")
          .set({
            foodCentres,
            menus,
            stalls,
          })
          .then(function () {
            dispatch({ type: BOOK_SEAT, index });
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      });
  };
};

export const unbookSeat = (index) => {
  return function (dispatch) {
    let foodCentre = null;

    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .get()
      .then((doc) => {
        const { foodCentres } = doc.data();
        foodCentres[index].capacity = foodCentres[index].capacity + 1;

        db.collection("Database")
          .doc("F8ZKbAihxgnysKPDSP3L")
          .set({
            foodCentres,
          })
          .then(function () {
            dispatch({ type: UNBOOK_SEAT, index });
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      });
  };
};
