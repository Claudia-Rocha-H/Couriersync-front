import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CourierSync',
  description: 'App de envíos y logística',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-black font-sans">{children}</body>
    </html>
  )
}
