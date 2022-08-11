import React from 'react'
import {Link} from 'react-router-dom'
export default function Nav() {
  return (
    <div>
      <ul>
        <li><Link to ='/Home'> Dogs</Link></li>
        <li><Link to ='/CreateRace'> Add Dog</Link></li>
      </ul>
    </div>
  )
}
