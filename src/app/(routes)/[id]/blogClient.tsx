'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from 'next/navigation'
import Image from "next/image"
import { MusicBlog } from "@/types/media"
import "./blog.css"
import Comment from "@/app/components/comment/comment"
import AudioPlayer from "@/app/components/audioPlayer/audio"
import StyledTexts from '@/app/(routes)/[id]/sytledText';
import CustomLoader from "@/app/customLoader"
import ImageLoader from "@/app/imageLoader"



export default function BlogClient() {
    const dburl = process.env.NEXT_PUBLIC_API_URL
    const params= useParams()
    const [blog, setBlog] = useState<MusicBlog | null>(null)
    const [imageLoading, setImageLoading] = useState(true)
    const [isSticky, setIsSticky] = useState(false)

        const id = params.id


    useEffect(()=>{
        async function fetchData(){
             const response = await axios.post(`${dburl}/aboutBlog`, {
              id
           })
              setBlog(response.data.musicblog)
              console.log(response.data.musicblog.highlights)
        }         

      
        fetchData()

           // Listen to scroll event
           const handleScroll = () => {
            const navbarHeight = 100; // Example height of navbar
            if (window.scrollY > navbarHeight) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
       }, [])


    const handleImageLoad = () => {
      setImageLoading(false)
      console.log("finished")
  }

      
       return(
        <div className="blog-container">
{
  blog ?
          <div className="blog"  key={blog._id}>  
          <div className="blog-artist-info">

    <div className={`artist-info ${isSticky ? 'sticky' : ''}`}>
          <div className="blog-type">                      
<small>{blog.type} | </small> 
  <small>Released: {blog.releaseDate}</small>
          </div>

      <div className="blog-image">
      {imageLoading && <ImageLoader styleClass = "music-cover-preloader"/>}
          <img           
          onLoad={handleImageLoad}
          className="music-cover" 
          src={blog.cover}       
          alt="Music cover"
          onError={() => setImageLoading(false)}
          style={{ display: imageLoading ? 'none' : 'block' }}
          />
        </div>               
                        <h3>{blog.title}</h3>
                        <p>By {blog.artist}</p>
                        {/* <p>Duration: {blog.duration} </p> */}
                        </div>
<div className="blog-info">
  <div className="blog-title-container"><h3 className="blog-title">{blog.blogTitle} </h3></div>

  <StyledTexts description={blog.description} highlights={blog.highlights} />


          <Comment id={id}/>
          {
          blog.musicFilePath ?  <AudioPlayer src={blog.musicFilePath}/>  : null
          }
         
        </div>
        </div>
                      </div>
                      : 
                     <CustomLoader/>

}
        </div>
       )
}
