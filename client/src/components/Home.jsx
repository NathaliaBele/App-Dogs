import React from "react";
import { Card } from "./Card";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderByAsc,
  getDivisionPage,
  getDogsAction,
  getPageDogs,
  orderByWeight,
  filterDogs,
  allDogGlobal,
  getTemperaments,
  filterByTemperaments,
} from "../redux/dogsDucks";
import "./Home.css";

//useSelector,

export default function Home() {
  const { allDogs } = useSelector((state) => state); //obtener los valores del estado
  const [getDogs, setGetDogs] = useState([]); // traer los perros de redux para utilizarlo en el componente
  //mostrar la inf.   //asignar la inf. le asigna el valor a get dogs.
  //contenedor perros.
  //useState da la funcionalidad para contener y asignar
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(undefined);
  const [selectAbc, setSelectAbc] = useState("");
  const [selectWeigth, setSelectWeigth] = useState("");

  useEffect(() => {
    dispatch(getTemperaments());

    fetch("http://localhost:3001/dogs").then((r) =>
      r.json().then((rta) => {
        dispatch(getDogsAction(rta));
        dispatch(allDogGlobal(rta)); //despacha al estado global
      })
    );
  }, []); //que se ejecute antes que renderize el componente

  useEffect(() => {
    setGetDogs(allDogs);
  }, [allDogs]); //cada vez que allDogs cambie se ejecuta lo que hay en el Callback

  useEffect(() => {
    dispatch(getDivisionPage(state.allDogs));
    if (currentPage === undefined) {
      setCurrentPage(0);
    }
    dispatch(
      getPageDogs(currentPage === undefined ? 0 : currentPage, state.allDogs)
    );
  }, [state.allDogs]);

  useEffect(() => {
    dispatch(
      getPageDogs(currentPage === undefined ? 0 : currentPage, state.allDogs)
    );
  }, [currentPage]);

  useEffect(() => {
    dispatch(orderByAsc(state.allDogs, selectAbc));
    dispatch(
      getPageDogs(currentPage === undefined ? 0 : currentPage, state.allDogs)
    );
  }, [selectAbc]);

  useEffect(() => {
    dispatch(orderByWeight(state.allDogs, selectWeigth));
    dispatch(
      getPageDogs(currentPage === undefined ? 0 : currentPage, state.allDogs)
    );
  }, [selectWeigth]);

  function filterFunctionOrigin(e) {
    dispatch(filterDogs(state.allDogsGlobal, e.target.value));
  }
  function filterFunctionTemperaments(e) {
    dispatch(filterByTemperaments(state.allDogsGlobal, e.target.value));
  }

  return (
    <div className="home">
      <Nav />
      <SearchBar />
      <div>
        <label>Ordenar orden alfabético</label>
        <select
          defaultValue={""}
          onChange={(e) => {
            if (e.target.value === "") {
              return;
            }
            setSelectAbc(e.target.value);
          }}
        >
          <option value={""}>select</option>
          <option value={"A-z"}> A-z</option>
          <option value={"Z-a"}>Z-a</option>
        </select>
      </div>
      <div>
        <label>Ordenar por peso</label>
        <select
          defaultValue={""}
          onChange={(e) => {
            if (e.target.value === "") {
              return;
            }
            setSelectWeigth(e.target.value);
          }}
        >
          <option value={""}>select</option>
          <option value={"DES"}> DES </option>
          <option value={"ASC"}> ASC </option>
        </select>
      </div>

      <div>
        <label>Filter </label>
        <select defaultValue={""} onChange={filterFunctionOrigin}>
          <option value={""}>select</option>
          <option value={"API"}> API </option>
          <option value={"BD"}> BD </option>
        </select>
      </div>

      <div>
        <select onChange={filterFunctionTemperaments}>
          <option value={""}>select</option>
          {state.temperaments.map((e) => {
            return (
              e.name !== "" && (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              )
            );
          })}
        </select>
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

      <div>
        {state.divitionPage.length > 0 &&
          state.allDogs.length !== 1 &&
          state.divitionPage.map((b, key) => {
            return (
              <button key={key + Date.now} onClick={() => setCurrentPage(b)}>
                {b + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
}
