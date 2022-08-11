import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {getDogsByNameAction} from '../redux/dogsDucks' 
export default function SearchBar() {
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault()
        dispatch(getDogsByNameAction(search))
        setSearch('')
    }
    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }
  return (
    <div>
    <form onSubmit={onSubmit}>
    <input type= 'search' onChange={onInputChange} value={search} placeholder='Type...'/>
    <input type='submit' value="Search"/>
    </form>
    </div>
  )
}