import {useEffect, useState} from "react"
import axios from "axios"
import "./latest.css"
import { MusicBlog } from "@/types/media";
import Link from "next/link";

export default function LatestMusicBlog () {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [latestMusicBlog, setLatestMusicBlog ] = useState<MusicBlog[]>([])

    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const response = await axios.get(`${apiUrl}/latestMusicBlogs`);   
                console.log(response)     
                setLatestMusicBlog(response.data)
            }
            catch{

            }
        }
        fetchData()
    }, [])
    return (
        <div className="home-latest-music-blogs-container">
            <div className="latest-header-container">
                            <h3 className="latest-header">Latest Music Blogs</h3>
            </div>
            <div className="home-latest-music-blogs">
             {
                latestMusicBlog.map((musicBlog) => (
                      <div  key={musicBlog._id}>
                        <Link className="home-latest-music-blog" href={musicBlog._id}>
                        <img 
                        onLoad={() => console.log("loading")}
                        className="music-cover" 
                        src={musicBlog.cover}/>
                        <h3>{musicBlog.blogTitle}</h3>
                        {/* <p>Artist: {musicBlog.artist}</p> */}
                        </Link>
                        {/* <p>Duration: {musicBlog.duration} </p>
                        <p>Description: {musicBlog.description}</p>
                        <p>{musicBlog.musicFilePath}</p> */}
                      </div>
                    ))
              } 
            </div>
              
        </div>
    )
}