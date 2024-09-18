import Image from "next/image"
import headphonesPreloader from  "../../public/images/preloader.gif"
import "./globals.css"

interface ImageLoaderProps {
    styleClass: string; // Define the type for the className
  }
  
export default function ImageLoader ({styleClass}: ImageLoaderProps) {
    console.log({styleClass})
    return(
        <div className="image-preloader-container" > 
          <Image className={`${styleClass}`} alt="preloader" src={headphonesPreloader}/>
          </div>
    )
}