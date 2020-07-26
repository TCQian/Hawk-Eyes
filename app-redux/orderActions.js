import { db } from "../firebase/firebaseConfig";

export const ORDER_FOOD = "ORDER_FOOD";
export const ORDER_DONE = "ORDER_DONE";

let index = 0;

export const orderFood = (arr) => {
  const patronId = arr[0];
  const menu = arr[1];
  const stallOwner = arr[2];

  //reset the index if the index exceeds 300
  if (index === 300) {
    index = 0;
  }

  const obj = {
    name: menu.name,
    orderBy: patronId,
    orderOn: new Date(),
    key: index++,
  };

  const newHistory = [...stallOwner.history, obj];
  return function (dispatch) {
    db.collection("Users")
      .doc(stallOwner.userId)
      .update({
        history: newHistory,
      })
      .then(function () {
        dispatch({ type: ORDER_FOOD });
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};

export const orderDone = (arr) => {
  const orders = arr[0];
  const orderKey = arr[1];
  const patronId = arr[2];

  const newOrders = orders.filter((order) => order.key !== orderKey);
  return function (dispatch) {
    db.collection("Users")
      .doc(patronId)
      .update({
        history: newOrders,
      })
      .then(function () {
        dispatch({ type: ORDER_DONE });
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
};
