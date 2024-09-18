'use client'
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import "./navbar.css"
import { usePathname } from 'next/navigation'
import MobileNav from "./mobilenav"
import axios from "axios";
import { useGlobalContext } from "@/context/globalContexts"
import { toast } from "react-hot-toast";


export default function Navbar () {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const genreTerm = useSearchParams()
    const query = genreTerm.get('')
    const router = useRouter()
    const pathname = usePathname()
    const [searchTerm, setSearchTerm] = useState("")

    const { isAuthenticated, setIsAuthenticated } = useGlobalContext();

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
          router.push("/")
        } catch (error) {
          toast.error("error while logging out")
        }
      };
      

    async function handleSearch (e:any) {
        e.preventDefault()
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
      

return (

<header>
<nav className="header-container">
    <h1><Link className= "nav-link" href="/">AUDET blog</Link></h1>
    

    <form onSubmit={handleSearch} className="search-form">
                <input  className="search" type="search" placeholder="search music, album or artist"
                   value={searchTerm} 
                   onChange={(e) => setSearchTerm(e.target.value)}/>
    </form>

    <div className="nav-links-container">
    <Link className={`nav-link ${pathname === '/genres' && query === 'pop' ? 'active' : ''}`} href="/genres?=pop">Pop</Link>
    <Link className={`nav-link ${pathname === '/genres' && query === 'afrobeat' ? 'active' : ''}`} href="/genres?=afrobeat">Afrobeat</Link>
        <Link className={`nav-link ${pathname === '/about' ? 'active' : ''}`} href="/about">About</Link>
        {
            !isAuthenticated ? 
            (<>        
                <Link className={`nav-link ${pathname === '/signup' ? 'active' : ''}`} href="/signup">Signup</Link>
        <Link className={`nav-link ${pathname === '/login' ? 'active' : ''}`} href="/login">Login</Link></>) 
        : 
        (<button onClick={logout} className="nav-logout">logout</button>)
        }



    </div>
</nav>
<MobileNav/>
</header>
)
}

