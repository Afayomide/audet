import "./globals.css"
import { Viewport } from "next"



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
        
      <body>{children}</body>
    </html>
  )
}
