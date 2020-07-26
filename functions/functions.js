import React from "react";

/**
 * This function takes in a list of items and a item name to find out if
 * the item name exists inside the list of items.
 * For example: get food centre, get stall
 */
export const getItemsByName = (listOfItems, itemName) => {
  const result = listOfItems.filter((item) => item.name === itemName);
  return [...result];
};

/**
 * This function takes in a list of items and a item parent key to find out if
 * the item with given parent key exists inside the list of items.
 * For example: get stalls, get menus
 */
export const getItemsByParentKey = (listOfItems, itemParentId) => {
  const result = listOfItems.filter((item) => item.parentId === itemParentId);
  return [...result];
};

/**
 * This function takes in a list of parents and a parentkey
 * return the parent taht has the parent KEy
 * */

export const getParentsByParentKey = (listOfItems, itemParentId) => {
  const result = listOfItems.filter((data) => data.id === itemParentId);
  return [...result];
};

/*
This function takes in two parameters, a foodCentreName and an array of search history.
If the foodCentreName is inside the array, the foodCentreName will be push to index 0.
Else the foodCentreName is added in the front of the array.
*/
export function addSearchHistory(foodCentreName, arr) {
  const index = arr.indexOf(foodCentreName);
  const newArray = [...arr];

  if (index === -1) {
    newArray.unshift(foodCentreName);
    return newArray;
  } else if (index === 0) {
    return arr;
  } else {
    const firstPart = arr.slice(0, index);
    const secondPart = arr.slice(index + 1, arr.length);
    return [foodCentreName, ...firstPart, ...secondPart];
  }
}
