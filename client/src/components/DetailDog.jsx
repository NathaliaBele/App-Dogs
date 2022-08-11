import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from './Nav';
import SearchBar from './SearchBar';



export default function DetailDog() {
    const [dog, setDog] = useState([])
    let {id} = useParams();
    useEffect(()=>{
        fetch(`http://localhost:3001/dogs/${id}`).then((respuesta) =>
     respuesta.json().then((body)=>{
      let [doggy] = body
      setDog(doggy)
     })
    );
    },[])
    return (
    <div>
      <Nav/>
      <SearchBar/>
        <div>
        <h1>Name: {dog.name}</h1>
        <img src={dog.image} alt=''/>
        <h1>Temperament: {dog.temperament}</h1>
        <h1>Weight: {dog.weight}</h1>
        

        </div>


    </div>
  )
}
