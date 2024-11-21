'use client'
import { useState, useEffect } from 'react';
import "./first-section.css"
import { ReactTyped } from "react-typed";
import Link from 'next/link';
import heroImage from "../../../../../public/images/home-image1.png"
import heroWoman from "../../../../../public/images/hero-woman.png"
import Image from 'next/image';
import neonBg from "/public/images/neon.jpg"


export default function FirstSection () {
   
   return(
    <div className='hero'>
   <div className='welcome'>
     <h2>
      <ReactTyped
      strings={[
        "<div><p>Everything</p> <p> Music</p></div>",
        "<div><p>Everything</p> <p> Sound</p></div>",
    
      ]}
      typeSpeed={40}
      backSpeed={50}
      showCursor={false}
    />
 </h2>

 <div className='welcome-buttons'>
  <Link href={"/latest"}>Latest Blogs</Link>
  <Link href={"https://www.linkedin.com/in/oluwaseyi-afayomide-849251161/"}>Meet The Dev</Link>
 </div>
   </div>   
   <div className='hero-images'>
    {/* <img className='neon-bg' src={neonBg.src}/> */}
            <img alt="tape-recorder" src={heroImage.src} className='tape-recorder'/>
          <img alt="woman listening to music" src={heroWoman.src} className='hero-woman'/>    

   </div>
    </div>
   )
}