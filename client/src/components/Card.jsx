import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export const Card = ({ dog }) => {
  return (
    <Fragment>
      {dog !== undefined && (
        <div className="card__country">
          <img
            className="card__country__img"
            src={dog === undefined ? "" : dog.image}
            alt=""
          />
          <h1>{dog.name}</h1>
          <h1>{dog.temperament}</h1>
          <h1>{dog.weight}</h1>
          <button className="card__dog__button">
            {" "}
            <Link className="card__dog__link" to={`/DetailDog/${dog.id}`}> 
            Show more
            </Link>
          </button>
        </div>
      )}
    </Fragment>
  );
};
