import { store } from '@/store/store'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Provider store={store}>
            <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  ) 

}
