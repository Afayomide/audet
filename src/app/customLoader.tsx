import Image from "next/image"
import headphonesPreloader from  "../../public/images/preloader.gif"
import "./globals.css"


export default function CustomLoader () {
    return(
        <div className="preloader-container" > 
        <p>Loading...</p>
          <Image className="preloader" alt="preloader" src={headphonesPreloader}/>
          </div>
    )
}