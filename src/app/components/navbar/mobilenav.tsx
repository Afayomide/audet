'use client'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import "./navbar.css"
import { usePathname } from 'next/navigation'
import { FaHamburger } from "react-icons/fa"
import { FaX } from "react-icons/fa6"



export default function MobileNav () {
    const pathname = usePathname()
    const [showNav, setShowNav] = useState(false)
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")


    async function handleSearch (e:any) {
        e.preventDefault()
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
      

    function HandleShowNav () {
        if(showNav){
            setShowNav(false)
        }
        else{
            setShowNav(true)
        }
    }
return (

<nav >
    <div className="mobile-nav">
<div className="mobile-header-container">
    <h1><Link className= "nav-link" href="/">Audet Blog</Link></h1>
    

    
    <div>
        {
            !showNav ? <FaHamburger onClick={HandleShowNav}/> : <FaX onClick={HandleShowNav}/>
        }
    
</div>
</div>
<div className={showNav ? "show-nav-links" : "hide-nav-links"}>
    <div className="mobile-nav-links-container">
    <Link className={`mobile-nav-link ${pathname === '/genres' ? 'active' : ''}`} href="/genres">Genres</Link>
        <Link className={`mobile-nav-link ${pathname === '/lastestalbums' ? 'active' : ''}`} href="/latestalbums">Latest Albums</Link>
        <Link className={`mobile-nav-link ${pathname === '/signup' ? 'active' : ''}`} href="/signup">Signup</Link>
        <Link className={`mobile-nav-link ${pathname === '/login' ? 'active' : ''}`} href="/login">Login</Link>
        <Link className={`mobile-nav-link ${pathname === '/about' ? 'active' : ''}`} href="/about">About</Link>
    </div>    
</div>
</div>
<form onSubmit={handleSearch} className="mobile-search-form">
                <input className="mobile-search" type="search" placeholder="search music, album or artist"
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                />
    </form>
</nav>
)
}