import type { Metadata } from 'next'
import { Providers } from './providers'
import '@fontsource/titan-one'
import '@fontsource/montserrat'
import '@fontsource/montserrat/300.css'
import '@fontsource/playfair-display/700.css'

export const metadata: Metadata = {
  title: 'Juice Machine',
  description: 'Juice Machine application'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
