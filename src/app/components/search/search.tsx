'use client'
import "./search.css"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { useEffect,useState } from "react"
import axios from "axios"
import { MusicBlog } from "@/types/media"
import cuteCat from "../../../../public/images/cutecat.jpeg"



export default function Search() {
    const searchTerm = useSearchParams()
    const search = searchTerm.get('q')
    const [should, setShould] = useState(true)
    const [results, setResults] = useState<MusicBlog[]>([])

    const dburl = process.env.NEXT_PUBLIC_API_URL

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await axios.get(`${dburl}/search`, {
                params: { searchTerm: search }  // Use 'q' as the parameter name if that's what your API expects
              });           
              setResults(response.data.result) 
              setShould(true)
            }
            catch (error) {
                console.log(error)
                setShould(false)
            }
        } 
      
        fetchData()
       },[search])
    return(
        <div className="search-result-blogs-container">
            <h3>Search Results for <span>{search}</span></h3>
        <div className="search-result-blogs">
{ should ? (
    results.map((result)=>(
          <div  key={result._id} >
            <Link className="search-result-blog" href={result._id}>
                        <img className="music-cover" src={result.cover}/>
                        <h3>{result.title}</h3>
                        <p>Artist: {result.artist}</p>
                        <p>Duration: {result.duration} </p>
</Link>
                      </div>
    ))
) : (
<div className="search-not-found">
    <Image src={cuteCat} alt="oops, not found"/>
    <p>Oops audet.blog is new</p>
    <p>We don&apos;t have what you are looking for yet but you can contact us to make a request</p>
</div>)
}
        </div>
        </div>
    )
}