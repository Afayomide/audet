'use client'
import { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import "./first-section.css"

export default function FirstSection () {
   
   return(
    <div>
   <div className='welcome'>
     <h2>Audet Blog</h2>
      <p className='subscript'>   <Typewriter
  options={{
    strings: ['Everything Music!!', 'Anything Music!!'],
    autoStart: true,
    loop: true,
  }}/>
</p>
   </div>
       
    </div>
   )
}