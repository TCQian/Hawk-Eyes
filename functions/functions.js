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
export const getItemsByParentKey = (listOfItems, itemParentKey) => {
  const result = listOfItems.filter((item) => item.parentKey === itemParentKey);
  return [...result];
};

/**
 * This function takes in a list of parents and a parentkey
 * return the parent taht has the parent KEy
 * */

export const getParentsByParentKey = (listOfItems, itemParentKey) => {
  const result = listOfItems.filter((data) => data.key === itemParentKey);
  return [...result];
};
