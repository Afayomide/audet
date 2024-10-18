import {useEffect, useState} from "react"
import axios from "axios"
import "./latest.css"
import { MusicBlog } from "@/types/media";
import Link from "next/link";
import ImageLoader from "@/app/imageLoader";

export default function LatestMusicBlog () {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [latestMusicBlog, setLatestMusicBlog ] = useState<MusicBlog[]>([])
    const [imageLoading, setImageLoading] = useState(true)
    const [loading, setLoading] = useState(true);


    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const response = await axios.get(`${apiUrl}/latestMusicBlogs`);   
                console.log(response)     
                setLatestMusicBlog(response.data)
                setLoading(false); 

            }
            catch{
                setLoading(false); 

            }
        }
        fetchData()
    }, [])

    const handleImageLoad = () => {
        setImageLoading(false)
        console.log("finished")
    }
    return (
        <div className="home-latest-music-blogs-container">
            <div className="latest-header-container">
                            <h3 className="latest-header">Latest Music Blogs</h3>
            </div>
            {
                loading ? (<div className="home-blogs-loader-container">
                    <h6>Loading...</h6>
                    <ImageLoader styleClass="home-blogs-loader"/>
                    </div>) :
                (
            <div className="home-latest-music-blogs">
             {
                latestMusicBlog.map((musicBlog) => (
                      <div  key={musicBlog.id}>
                        <Link className="home-latest-music-blog" href={musicBlog.id.toString()}>
                        {imageLoading && <ImageLoader styleClass = "music-cover-preloader"/>}
                        <img 
                        onLoad={handleImageLoad}
                        className="music-cover" 
                        src={musicBlog.cover}
                        style={{ display: imageLoading ? 'none' : 'block' }}
                        />
                        <h3>{musicBlog.blog_title}</h3>
                        {/* <p>Artist: {musicBlog.artist}</p> */}
                        </Link>
                        {/* <p>Duration: {musicBlog.duration} </p>
                        <p>Description: {musicBlog.description}</p>
                        <p>{musicBlog.musicFilePath}</p> */}
                      </div>
                    ))
              } 
            </div>
                )
            }
              
        </div>
    )
}