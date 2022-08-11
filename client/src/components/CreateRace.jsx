import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "./Nav";

import { getTemperaments } from "../redux/dogsDucks";
import "./CreateRace.css";
export default function CreateRace() {
  const { temperaments } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (temperaments.length === 0) {
      dispatch(getTemperaments());
    }
  }, []);

  const [optionSelects, setOptionSelects] = useState([]);

  const [inputErrors, setInputErrors] = useState({
    name: {
      status: false,
      mjs: "",
    },
    minHeight: {
      status: false,
      msj: "",
    },
    maxHeight: {
      status: false,
      msj: "",
    },
    minWeight: {
      status: false,
      msj: "",
    },
    maxWeight: {
      status: false,
      msj: "",
    },
    lifeSpan: {
      status: false,
      msj: "",
    },
  });

  const [input, setInput] = useState({
    name: "",
    minHeight: 0,
    maxHeight: 0,
    minWeight: 0,
    maxWeight: 0,
    lifeSpan: "",
  });

  function onChangeInput(e) {
    if (e.target.name === "minHeight" && e.target.value > input.maxHeight) {
      setInputErrors({
        ...inputErrors,
        minHeight: {
          status: true,
          msj: "Este valor no puede superar el Máximo",
        },
      });
      return;
    } else if (
      e.target.name === "maxHeight" &&
      e.target.value < input.minHeight
    ) {
      return;
    }

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function onHandleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <Nav />
      <form onSubmit={onHandleSubmit}>
        <label> Name </label>
        <input
          onChange={(e) => {
            if (e.target.value === "") {
              setInputErrors({
                ...inputErrors,
                name: { status: true, mjs: "El campo tiene que estar lleno" },
              });
              onChangeInput(e);
            } else {
              setInputErrors({
                ...inputErrors,
                name: { status: false, mjs: "El campo tiene que estar lleno" },
              });
            }
            onChangeInput(e);
          }}
          name="name"
          value={input.name}
        />

        {inputErrors.name.status && (
          <p style={{ color: "red" }}>{inputErrors.name.mjs}</p>
        )}

        <label> Height </label>
        <input
          type="number"
          onChange={(e) => {
            setInputErrors({
              ...inputErrors,
              minHeight: {
                status: false,
                msj: "",
              },
            });

            onChangeInput(e);
          }}
          name="minHeight"
          value={input.minHeight}
          placeholder="MIN"
        />
        {inputErrors.minHeight.status && (
          <p style={{ color: "red" }}>{inputErrors.minHeight.msj}</p>
        )}

        <input
          type="number"
          onChange={onChangeInput}
          name="maxHeight"
          value={input.maxHeight}
          placeholder="MÁX"
        />
        <label> Weight </label>
        <input
          type="number"
          onChange={onChangeInput}
          name="minWeight"
          value={input.minWeight}
          placeholder="MIN"
        />
        <input
          type="number"
          onChange={onChangeInput}
          name="maxWeight"
          value={input.maxWeight}
          placeholder="MÁX"
        />
        <label> Life Span </label>
        <input
          onChange={onChangeInput}
          name="lifeSpan"
          value={input.lifeSpan}
        />

        <div className="global__container">
          {/* Caja seleccionados */}
          <div className="container__options">
            {optionSelects.map((s) => {
              return (
                <ul
                  onClick={() => {
                    let rta = optionSelects.filter((p) => p !== s);
                    setOptionSelects(rta);
                  }}
                  className="option__select"
                >
                  {s}
                </ul>
              );
            })}
          </div>

          {/* Caja opciones*/}
          <div className="container__options">
            {temperaments.map((t) => {
              return (
                <ul
                  onClick={() => {
                    setOptionSelects([...optionSelects, t.name]);
                  }}
                  className="option__select"
                >
                  {t.name}
                </ul>
              );
            })}
          </div>
        </div>

        <button type="submit"> CREAR </button>
      </form>
    </div>
  );
}
