import "./globals.css"

export const metadata = {
  title: 'Audet Blog',
  description: 'Everything and Anything Music',
  themeColor: '#000000',
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
