"use client"
import "./search.css"
import { useSearchParams } from 'next/navigation'
import { useEffect,useState } from "react"
import axios from "axios"
import { MusicBlog } from "@/types/media"



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
        <div>
{ should ? (
    results.map((result)=>(
          <div  key={result._id}>
                        <img src={result.cover}/>
                        <h3>{result.title}</h3>
                        <p>Artist: {result.artist}</p>
                        <p>Duration: {result.duration} </p>

                      </div>
    ))
) : (<p>Found Nothing</p>)
}
        </div>
    )
}