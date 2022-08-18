import React from "react";
import { Card } from "./Card";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogsAction,
  allDogGlobal,
  getTemperaments,
  getPageDogs,
  getDivisionPage,
} from "../redux/dogsDucks";
import "./Home.css";
import Paginated from "./Paginated";
import OrderBy from "./OrderBy";
import Filter from "./Filter";
//useSelector,

export default function Home() {
  // traer los perros de redux para utilizarlo en el componente
  //contenedor perros.  //asignar la inf. le asigna el valor a get dogs.
  //useState da la funcionalidad para contener y asignar

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());

    /*async function fetchData() {
      const respuesta = await fetch("http://localhost:3001/dogs");
      const body = await respuesta.json();
      dispatch(getDogsAction(body));
      dispatch(allDogGlobal(body));
    }
    fetchData();
*/

    fetch("http://localhost:3001/dogs").then((r) =>
      r.json().then((rta) => {
        dispatch(getDogsAction(rta));
        
          dispatch(allDogGlobal()); //despacha al estado global

      })
    );
  }, []); //que se ejecute antes que renderize el componente

  useEffect(() => {
    dispatch(getPageDogs(state.currentPageGlobal, state.allDogs));
    dispatch(getDivisionPage(state.allDogs));
  }, [state.allDogs]);

  return (
    <div className="home">
      <div className="navbar">
        <SearchBar />
        <Nav />
      </div>
      <div>
        <OrderBy />
      </div>
      <div className="container__cards">
        {state.eigthDogs.length > 0 && state.eigthDogs[0] !== undefined ? (
          state.eigthDogs.map((doggy, key) => (
            <Card key={key + Date.now} dog={doggy} />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      {state.allDogsGlobal.length > 0 && (
        <div className="paginatorContainer">
          <Paginated />
        </div>
      )}
    </div>
  );
}
