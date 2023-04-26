
import Footer from '@/components/mainLayout/footer'
import Header from '@/components/mainLayout/header'
import '@/styles/globals.css'
import { Providers } from './globalRedux/provider'
// import { SessionProvider } from 'next-auth/react'

export const metadata = {
  title: 'Jeju Info',
  description: 'Jeju Info app',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <SessionProvider> */}
          <Providers>
          `<Header />
            <div className="flex items-center justify-center" style={{minHeight: '100vh'}}>
                {children}
            </div>
            <Footer />
          </Providers>
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
