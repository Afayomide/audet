'use client'
import { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import "./first-section.css"

export default function FirstSection () {
   
   return(
    <div>
   <div className='welcome'>
     {/* <h2>Audet Blog</h2> */}
      <h2 className=''>   <Typewriter
  options={{
    strings: ['Everything Music!!', 'Anything Music!!'],
    autoStart: true,
    loop: true,
  }}/>
</h2>
   </div>
       
    </div>
   )
}