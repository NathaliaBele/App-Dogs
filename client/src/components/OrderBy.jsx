import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDivisionPage,
  getDogsAction,
  getPageDogs,
  orderByAsc,
  orderByAzAction,
  orderByWeight,
} from "../redux/dogsDucks";
import Filter from "./Filter";
import FilterTemp from "./FilterTemp";

export default function OrderBy() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPageDogs(state.currentPageGlobal, state.allDogs));
    dispatch(getDivisionPage(state.allDogs));
  }, [state.allDogs]);

  const orderByAz = (option) => {

    if (option.target.value == "select") {
      dispatch(getDogsAction(state.allDogsGlobal))
      return
    }
 
 
    dispatch(orderByAzAction(state.allDogsGlobal, option.target.value))
 
  };

  function OrderByWeigth(option) {
    dispatch(orderByWeight(state.allDogsGlobal, option));
  }

  return (
    <div className="filterNav">
      <div>
        <label>Order by </label>
        <select defaultValue={""} onChange={orderByAz}>
          <option>select</option>
          <option value={"A-z"}> A-z</option>
          <option value={"Z-a"}>Z-a</option>
        </select>
      </div>
      <div>
        <label>Order by weight </label>
        <select
          defaultValue={""}
          onChange={(e) => {
            if (e.target.value === "") {
              return;
            }
            OrderByWeigth(e.target.value);
          }}
        >
          <option value={""}>select</option>
          <option value={"DES"}> DES </option>
          <option value={"ASC"}> ASC </option>
        </select>
      </div>
      <Filter />
      <FilterTemp />
    </div>
  );
}
