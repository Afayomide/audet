import "./globals.css"
import Head from 'next/head';



export const metadata = {
  title: 'Audet Blog',
  description: 'Everything and Anything Music',
  themeColor: '#FF9505',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
         <Head>
        <meta name="theme-color" content="#FF9505" />
      </Head>
      <body>{children}</body>
    </html>
  )
}
