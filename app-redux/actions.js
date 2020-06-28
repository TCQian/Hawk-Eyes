import db from "../firebase/firebaseConfig";
import * as firebase from "firebase";

export const UPDATE_FOODCENTRE = "UPDATE_FOODCENTRE";
export const DELETE_FOODCENTRE = "DELETE_FOODCENTRE";
export const EDIT_FOODCENTRE = "EDIT_FOODCENTRE";
export const UPDATE_STALL = "UPDATE_STALL";
export const DELETE_STALL = "DELETE_STALL";
export const EDIT_STALL = "EDIT_STALL";
export const UPDATE_MENU = "UPDATE_MENU";
export const DELETE_MENU = "DELETE_MENU";
export const EDIT_MENU = "EDIT_MENU";
export const UPDATE_USER = "UPDATE_USER";
export const SET_USER = "SET_USER";
export const SET_FOODCENTRES_DATA = "SET_FOODCENTRES_DATA";
export const SET_STALLS_DATA = "SET_STALLS_DATA";
export const SET_MENUS_DATA = "SET_MENUS_DATA";
export const FOODCENTRE_USER = "FOODCENTRE_USER";
export const STALL_USER = "STALL_USER";
export const PATRON_USER = "PATRON_USER";

//Action Creator
// Update store
export const addFoodCentre = (newFoodCentre) => ({
  type: UPDATE_FOODCENTRE,
  payload: newFoodCentre,
});

export const deleteFoodCentre = (foodCentre) => ({
  type: DELETE_FOODCENTRE,
  payload: foodCentre,
});

export const editFoodCentre = (oldFoodCentre, foodCentre) => ({
  type: EDIT_FOODCENTRE,
  payload: foodCentre,
  oldFoodCentre,
});

export const addStall = (newStall) => ({
  type: UPDATE_STALL,
  payload: newStall,
});

export const deleteStall = (stall) => ({
  type: DELETE_STALL,
  payload: stall,
});

export const editStall = (oldStall, stall) => ({
  type: EDIT_STALL,
  payload: stall,
  oldStall,
});

export const addMenu = (newMenu) => ({
  type: UPDATE_MENU,
  payload: newMenu,
});
export const deleteMenu = (menu) => ({
  type: DELETE_MENU,
  payload: menu,
});

export const editMenu = (oldMenu, menu) => ({
  type: EDIT_MENU,
  payload: menu,
  oldMenu,
});
// database - foodCentres
export const setFoodCentresData = (foodCentres) => ({
  type: SET_FOODCENTRES_DATA,
  payload: foodCentres,
});

export const watchFoodCentresData = () => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .get()
      .then(function (doc) {
        const { foodCentres } = doc.data();
        dispatch(setFoodCentresData(foodCentres));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// this will append a single foodCentre into database foodCentres list
export const updateFoodCentresData = (foodCentre) => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .update({
        foodCentres: firebase.firestore.FieldValue.arrayUnion(foodCentre),
      })
      .then(function () {
        // this dispatch will update react store.
        dispatch(addFoodCentre(foodCentre));
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};

// this will remove a single foodCentre from database foodCentres list
export const deleteFoodCentresData = (foodCentre) => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .update({
        foodCentres: firebase.firestore.FieldValue.arrayRemove(foodCentre),
      })
      .then(function () {
        // this dispatch will update react store.
        dispatch(deleteFoodCentre(foodCentre));
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};

// this will edit a particular foodCentre from database foodCentres list
export const editFoodCentresData = (arr) => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .get()
      .then((doc) => {
        const { foodCentres, menus, stalls } = doc.data();
        const foodCentre = arr[1];
        const oldFoodCentre = arr[0];

        const index = foodCentres.findIndex((item) => {
          return isEquivalent(item, oldFoodCentre);
        });

        foodCentres[index].name = foodCentre.name;
        foodCentres[index].numberOfStalls = foodCentre.numberOfStalls;
        foodCentres[index].capacity = foodCentre.capacity;
        foodCentres[index].address = foodCentre.address;

        const newFoodCentres = foodCentres.map((obj) => {
          return Object.assign({}, obj);
        });

        db.collection("Database")
          .doc("F8ZKbAihxgnysKPDSP3L")
          .update({
            foodCentres: newFoodCentres,
            menus,
            stalls,
          })
          .then(function () {
            dispatch(editFoodCentre(oldFoodCentre, foodCentre));
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};

// database - stalls
export const setStallsData = (stalls) => ({
  type: SET_STALLS_DATA,
  payload: stalls,
});

export const watchStallsData = () => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .get()
      .then(function (doc) {
        const { stalls } = doc.data();
        dispatch(setStallsData(stalls));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const updateStallsData = (stall) => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .update({
        stalls: firebase.firestore.FieldValue.arrayUnion(stall),
      })
      .then(function () {
        // this dispatch will update react store.
        dispatch(addStall(stall));
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};

export const deleteStallsData = (stall) => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .update({
        stalls: firebase.firestore.FieldValue.arrayRemove(stall),
      })
      .then(function () {
        // this dispatch will update react store.
        dispatch(deleteStall(stall));
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};

export const editStallsData = (arr) => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .get()
      .then((doc) => {
        const { foodCentres, menus, stalls } = doc.data();
        const oldStall = arr[0];
        const stall = arr[1];
        const index = stalls.findIndex((item) => {
          return isEquivalent(item, oldStall);
        });

        stalls[index].name = stall.name;
        stalls[index].parentKey = stall.parentKey;

        const newStalls = stalls.map((obj) => {
          return Object.assign({}, obj);
        });

        db.collection("Database")
          .doc("F8ZKbAihxgnysKPDSP3L")
          .update({
            foodCentres,
            menus,
            stalls: newStalls,
          })
          .then(function () {
            dispatch(editStall(oldStall, stall));
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};

// database - menus
export const setMenusData = (menus) => ({
  type: SET_MENUS_DATA,
  payload: menus,
});

export const watchMenusData = () => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .get()
      .then(function (doc) {
        const { menus } = doc.data();
        dispatch(setMenusData(menus));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const updateMenusData = (menu) => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .update({
        menus: firebase.firestore.FieldValue.arrayUnion(menu),
      })
      .then(function () {
        // this dispatch will update react store.
        dispatch(addMenu(menu));
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};

export const deleteMenusData = (menu) => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .update({
        menus: firebase.firestore.FieldValue.arrayRemove(menu),
      })
      .then(function () {
        // this dispatch will update react store.
        dispatch(deleteMenu(menu));
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};

export const editMenusData = (arr) => {
  return function (dispatch) {
    db.collection("Database")
      .doc("F8ZKbAihxgnysKPDSP3L")
      .get()
      .then((doc) => {
        const { foodCentres, menus, stalls } = doc.data();
        const oldMenu = arr[0];
        const menu = arr[1];
        const index = menus.findIndex((item) => {
          return isEquivalent(item, oldMenu);
        });

        menus[index].name = menu.name;
        menus[index].parentKey = menu.parentKey;
        menus[index].price = menu.price;
        menus[index].description = menu.description;

        const newMenus = menus.map((obj) => {
          return Object.assign({}, obj);
        });

        db.collection("Database")
          .doc("F8ZKbAihxgnysKPDSP3L")
          .update({
            foodCentres,
            menus: newMenus,
            stalls,
          })
          .then(function () {
            dispatch(editMenu(oldMenu, menu));
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};
// firestore - users
export const setUserData = (user) => ({
  type: SET_USER,
  payload: user,
});

export const watchUserData = (user) => {
  return function (dispatch) {
    db.collection("Users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        const { email, userType } = doc.data();
        dispatch(
          setUserData({
            email,
            userType:
              userType == "FOODCENTRE_USER"
                ? FOODCENTRE_USER
                : userType == "STALL_USER"
                ? STALL_USER
                : PATRON_USER,
            userId: user.uid,
            history: user.history,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const updateUserData = (user) => {
  return function (dispatch) {
    db.collection("Users")
      .doc(user.userId)
      .set({
        email: user.email,
        userType: user.userType,
        userId: user.userId,
      })
      .then(function () {
        // this dispatch will update react store.
        dispatch(
          setUserData({
            email: user.email,
            userType:
              user.userType == "FOODCENTRE_USER"
                ? FOODCENTRE_USER
                : user.userType == "STALL_USER"
                ? STALL_USER
                : PATRON_USER,
            userId: user.userId,
          })
        );
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
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
