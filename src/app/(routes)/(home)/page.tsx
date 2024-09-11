"use client"
import FirstSection from "@/app/components/home/first-section/first-section"
import LatestSong from "@/app/components/home/latest/latest-songs"
import "./home.css"


export default function Home (){
    return(
<div className="home">
    <FirstSection/>
    <LatestSong/>
</div>
    )
}