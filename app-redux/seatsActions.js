import db from "../firebase/firebaseConfig";
import * as firebase from "firebase";

export const BOOK_SEAT = "BOOK_SEAT";
export const UNBOOK_SEAT = "UNBOOK_SEAT";

export const bookSeat = (foodCentre) => {
  return function (dispatch) {
    dispatch({ type: BOOK_SEAT, foodCentre });

    // let foodCentre = null;

    // db.collection("Database")
    //   .doc("F8ZKbAihxgnysKPDSP3L")
    //   .get()
    //   .then((doc) => {
    //     const { foodCentres, menus, stalls } = doc.data();
    //     const index = foodCentres.findIndex((item) => {
    //       return isEquivalent(item, foodCentre);
    //     });

    //     if (foodCentres[index].capacity === 0) {
    //       return null;
    //     }
    //     foodCentres[index].capacity = foodCentres[index].capacity - 1;

    //     db.collection("Database")
    //       .doc("F8ZKbAihxgnysKPDSP3L")
    //       .set({
    //         foodCentres,
    //         menus,
    //         stalls,
    //       })
    //       .then(function () {
    //         dispatch({ type: BOOK_SEAT, foodCentre });
    //       })
    //       .catch(function (error) {
    //         console.error("Error writing document: ", error);
    //       });
    //   });
  };
};

export const unbookSeat = (foodCentre) => {
  return function (dispatch) {
    dispatch({ type: UNBOOK_SEAT, foodCentre });

    // let foodCentre = null;

    // db.collection("Database")
    //   .doc("F8ZKbAihxgnysKPDSP3L")
    //   .get()
    //   .then((doc) => {
    //     const { foodCentres, menus, stalls } = doc.data();
    //     const index = foodCentres.findIndex((item) => {
    //       return isEquivalent(item, foodCentre);
    //     });
    //     foodCentres[index].capacity = foodCentres[index].capacity + 1;

    //     db.collection("Database")
    //       .doc("F8ZKbAihxgnysKPDSP3L")
    //       .set({
    //         foodCentres,
    //         menus,
    //         stalls,
    //       })
    //       .then(function () {
    //         dispatch({ type: UNBOOK_SEAT, foodCentre });
    //       })
    //       .catch(function (error) {
    //         console.error("Error writing document: ", error);
    //       });
    //   });
  };
};

function isEquivalent(a, b) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}
