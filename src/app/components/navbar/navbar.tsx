'use client'
import Link from "next/link"
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { useState } from "react";
import "./navbar.css"
import { usePathname } from 'next/navigation'
import MobileNav from "./mobilenav"


export default function Navbar () {
    const router = useRouter()
    const pathname = usePathname()
    const [searchTerm, setSearchTerm] = useState("")

    

    async function handleSearch (e:any) {
        e.preventDefault()
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
      

return (

<header>
<nav className="header-container">
    <h1><Link className= "nav-link" href="/">Audet Blog</Link></h1>
    

    <form onSubmit={handleSearch} className="search-form">
                <input  className="search" type="search" placeholder="search music, album or artist"
                   value={searchTerm} 
                   onChange={(e) => setSearchTerm(e.target.value)}/>
    </form>

    <div className="nav-links-container">
    <Link className={`nav-link ${pathname === '/genres' ? 'active' : ''}`} href="/genres">Genres</Link>
        <Link className={`nav-link ${pathname === '/lastestalbums' ? 'active' : ''}`} href="/latestalbums">Latest Albums</Link>
        <Link className={`nav-link ${pathname === '/latestsongs' ? 'active' : ''}`} href="/latestsongs">Latest Music</Link>
        <Link className={`nav-link ${pathname === '/makerequest' ? 'active' : ''}`} href="/makerequest">Make Request</Link>
        <Link className={`nav-link ${pathname === '/about' ? 'active' : ''}`} href="/about">About</Link>

    </div>
</nav>
<MobileNav/>
</header>
)
}

