import { db } from "../firebase/firebaseConfig";
import * as firebase from "firebase";
import { Alert } from "react-native";

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
export const SET_SEATINGPLAN_DATA = "SET_SEATINGPLAN_DATA";

//Action Creator
// Update store
export const addFoodCentre = () => ({
    type: UPDATE_FOODCENTRE,
});

export const deleteFoodCentre = () => ({
    type: DELETE_FOODCENTRE,
});

export const editFoodCentre = () => ({
    type: EDIT_FOODCENTRE,
});

export const addStall = (l) => ({
    type: UPDATE_STALL,
});

export const deleteStall = () => ({
    type: DELETE_STALL,
});

export const editStall = () => ({
    type: EDIT_STALL,
});

export const addMenu = () => ({
    type: UPDATE_MENU,
});
export const deleteMenu = () => ({
    type: DELETE_MENU,
});

export const editMenu = () => ({
    type: EDIT_MENU,
});

// database - foodCentres
export const setFoodCentresData = (foodCentres) => ({
    type: SET_FOODCENTRES_DATA,
    payload: foodCentres,
});

export const watchFoodCentresData = () => {
    return function (dispatch) {
        db.collection("foodCentres")
            .doc()
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
        db.collection("foodCentres")
            .add(foodCentre)
            .then(function () {
                // this dispatch will update react store.
                dispatch(addFoodCentre());
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    };
};

// this will remove a single foodCentre from database foodCentres list
export const deleteFoodCentresData = (foodCentre) => {
    return function (dispatch) {
        db.collection("foodCentres")
            .doc(foodCentre.id)
            .delete()
            .then(function () {
                // this dispatch will update react store.
                dispatch(deleteFoodCentre());
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    };
};

// this will edit a particular foodCentre from database foodCentres list
export const editFoodCentresData = (arr) => {
    const id = arr[0];
    const updatedFoodCentre = arr[1];
    return function (dispatch) {
        db.collection("foodCentres")
            .doc(id)
            .set(updatedFoodCentre)
            .then(function () {
                dispatch(editFoodCentre());
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
        db.collection("stalls")
            .doc()
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
        db.collection("stalls")
            .add(stall)
            .then(function () {
                // this dispatch will update react store.
                dispatch(addStall());
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    };
};

export const deleteStallsData = (id) => {
    return function (dispatch) {
        db.collection("stalls")
            .doc(id)
            .delete()
            .then(function () {
                // this dispatch will update react store.
                dispatch(deleteStall());
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    };
};

export const editStallsData = (arr) => {
    const id = arr[0];
    const updatedStall = arr[1];
    return function (dispatch) {
        db.collection("stalls")
            .doc(id)
            .set(updatedStall)
            .then(dispatch(editStall()))
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
        db.collection("menus")
            .doc()
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
        db.collection("menus")
            .add(menu)
            .then(function () {
                // this dispatch will update react store.
                dispatch(addMenu());
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    };
};

export const deleteMenusData = (id) => {
    return function (dispatch) {
        db.collection("menus")
            .doc(id)
            .delete()
            .then(function () {
                // this dispatch will update react store.
                dispatch(deleteMenu());
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    };
};

export const editMenusData = (arr) => {
    const id = arr[0];
    const updatedMenu = arr[1];
    return function (dispatch) {
        db.collection("menus")
            .doc(id)
            .set(updatedMenu)
            .then(dispatch(editMenu()))
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
                        userType: userType,
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
                        userType: user.userType,
                        userId: user.userId,
                    })
                );
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    };
};

// database - seatingPlan
export const setSeatingPlanData = (grid) => ({
    type: SET_SEATINGPLAN_DATA,
    payload: grid,
});

export const watchSeatingPlanData = (foodCentreId) => {
    return function (dispatch) {
        db.collection("seatingPlans")
            .doc(foodCentreId)
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    const { grid } = doc.data();
                    dispatch(setSeatingPlanData(grid));
                } else {
                    dispatch(setSeatingPlanData(null));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

// this will append a single foodCentre into database foodCentres list
export const updateSeatingPlanData = (seatingPlan) => {
    return function (dispatch) {
        db.collection("seatingPlans")
            .doc(seatingPlan.foodCentreId)
            .set(seatingPlan)
            .then(function () {})
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    };
};
