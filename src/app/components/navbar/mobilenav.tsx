'use client'
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react"
import axios from "axios"
import "./navbar.css"
import { usePathname } from 'next/navigation'
import { FaHamburger } from "react-icons/fa"
import { FaX } from "react-icons/fa6"
import { toast } from "react-hot-toast"
import { useGlobalContext } from "@/context/globalContexts"




export default function MobileNav () {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const genreTerm = useSearchParams()
    const query = genreTerm.get('')
    const pathname = usePathname()
    const [showNav, setShowNav] = useState(false)
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")
    const { isAuthenticated, setIsAuthenticated } = useGlobalContext();
    const [showSearch, setShowSearch] = useState("mobile-search-form")

   

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get(`${apiUrl}/checkAuth`, {
            withCredentials: true
          });
  
          if (response.status === 200) {
            setIsAuthenticated(true)
            console.log(response)
          } else {
            setIsAuthenticated(false)
            
          }
        } catch (error) {
          setIsAuthenticated(false);
          console.log(error)
        }
      };
  
      checkAuth();
    }, [setIsAuthenticated, isAuthenticated]);

    const logout = async () => {
        try {
          const response = await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
          console.log(response.data.message); // Handle success message
           const {success} = response.data
           if(success) {
            toast.success("Bye for now!")
           }          
            setIsAuthenticated(false)
            setShowNav(false)
           router.push("/")

        } catch (error) {
          toast.error("error while logging out")
          console.error('Error logging out:', error);
        }
      };
      

    async function handleSearch (e:any) {
        e.preventDefault()
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      }

      useEffect(() => {
          setShowNav(false); 
          if(pathname === '/login' || pathname === '/signup' || pathname === "/forgot-password") {
            setShowSearch("none")
          }
          else{
            setShowSearch('mobile-search-form')
          }
      }, [pathname]);
      

    function HandleShowNav () {
        if(showNav){
            setShowNav(false)
        }
        else{
            setShowNav(true)
        }
    }
return (

<nav>
    <div className="mobile-nav">
<div className="mobile-header-container">
    <h1><Link className= "nav-link" href="/">AUDET blog</Link></h1>
    

    
    <div>
        {
            !showNav ? <FaHamburger onClick={HandleShowNav}/> : <FaX onClick={HandleShowNav}/>
        }
    
</div>
</div>
<div className={showNav ? "show-nav-links" : "hide-nav-links"}>
    <div className="mobile-nav-links-container">
    <Link className={`mobile-nav-link ${pathname === '/genres'  && query === 'pop'? 'active' : ''}`} href="/genres?=pop">Pop</Link>
    <Link className={`mobile-nav-link ${pathname === '/genres'  && query === 'afrobeat' ? 'active' : ''}`} href="/genres?=afrobeat">Afrobeats</Link>
        <Link className={`mobile-nav-link ${pathname === '/about' ? 'active' : ''}`} href="/about">About</Link>
        {
            !isAuthenticated ? (
                <>        <Link className={`mobile-nav-link ${pathname === '/signup' ? 'active' : ''}`} href="/signup">Signup</Link>
        <Link className={`mobile-nav-link ${pathname === '/login' ? 'active' : ''}`} href="/login">Login</Link>
                    </>
            ) : (<div><button onClick={logout} className="mobile-nav-logout">Logout</button></div>)
        }

    </div>    
</div>
</div>
<form onSubmit={handleSearch} className={`${showSearch}`}>
                <input className="mobile-search" type="search" placeholder="search music, album or artist"
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                />
    </form>
</nav>
)
}