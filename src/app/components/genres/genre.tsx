'use client'
import "../search/search.css"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect,useState } from "react"
import axios from "axios"
import { MusicBlog } from "@/types/media"
import cuteCat from "../../../../public/images/cutecat.jpeg"
import CustomLoader from "@/app/customLoader"


export default function Genre() {
    const router = useRouter()
    const searchTerm = useSearchParams()
    const search = searchTerm.get('')
    const [should, setShould] = useState(true)
    const [results, setResults] = useState<MusicBlog[]>([])
    const [loading, setLoading] = useState(true)

    const dburl = process.env.NEXT_PUBLIC_API_URL
    console.log(search)

    if (search == null){
       router.push("./")
    }

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
            finally{
                    setLoading(false) // Set loading to false after data fetch completes
            }
        } 
      
        fetchData()
       },[search])
    return(
        <div className="search-result-blogs-container">
            <h3><span>{search}</span> blogs </h3>
            <div className="search-result-blogs">
                {loading ? (
                  <CustomLoader/>
                ) : should ? (
                    results.length > 0 ? (
                        results.map((result) => (
                            <div key={result.id}>
                                <Link className="search-result-blog" href={result.id.toString()}>
                                    <img className="music-cover" src={result.cover} alt={result.title} />
                                   <h3>{result.blog_title} </h3>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="search-not-found">
                            <Image src={cuteCat} alt="Oops, not found" />
                            <p>Oops, audet.blog is new</p>
                            <p>We don&apos;t have what you are looking for yet but you can contact us to make a request</p>
                        </div>
                    )
                ) : (
                    <div className="search-not-found">
                        <Image src={cuteCat} alt="Oops, not found" />
                        <p>Oops, audet.blog is new</p>
                        <p>We don&apos;t have what you are looking for yet but you can contact us to make a request</p>
                    </div>
                )}
            </div>
        </div>
    )
}