import "./footer.css"
import Link from "next/link"
import { MdEmail } from "react-icons/md"
import { BsTelegram } from "react-icons/bs"


export default function Footer () {
    return(
        <footer>
    <h1><Link className= "footer-link" href="/">AUDET blog</Link></h1>
    <div>
        <Link href={"/"} className="footer-contact-link"><MdEmail/></Link>
        <Link href={"/"} className="footer-contact-link"><BsTelegram/></Link>
    </div>
    </footer>
    )
}