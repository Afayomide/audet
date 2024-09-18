import "./globals.css"
import { Viewport } from "next"
import { GlobalProvider } from "@/context/globalContexts"
import { Toaster } from "react-hot-toast"
import { Suspense } from "react"
import CustomLoader from "./customLoader"

export const metadata = {
  title: 'Audet Blog',
  description: 'Everything and Anything Music',
}
export const viewport: Viewport = {
  themeColor: '#FF9505',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        
      <body>
        <Toaster  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: "",
    duration: 5000,
    style: {
      background: "#ffd79f",
      color: "#00000",
    },
  }}/>
      <Suspense fallback={<CustomLoader/>}><GlobalProvider> {children}</GlobalProvider></Suspense>  
        </body>
    </html>
  )
}
