import "./globals.css"

export const metadata = {
  title: 'AdotMusic',
  description: 'All Your Favorite Music in One Place',
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
