import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export const Card = ({ dog }) => {
  return (
    <Fragment>
      {dog !== undefined && (
        
        <div className="card__dog">
          <h4>{dog.name}</h4>
          <img
            className="card__dog__img"
            src={dog === undefined ? "" : dog.image}
            alt=""
          />
          <p>{dog.temperament}</p>
          <p>{dog.weight}</p>
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
