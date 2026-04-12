import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './OpenSide.css';
function OpenSide() {
    return (
    <div className='custum-side-bar'>
      <Link>Home</Link> 
      <Link>Short</Link>
      <Link>Subscription</Link> 
    </div>
  )
}

export default OpenSide;
