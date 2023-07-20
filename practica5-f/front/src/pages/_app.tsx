import '@/styles/globals.css'
import { client } from '@/utils/apolloclient'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
    <Component {...pageProps} />
    </ApolloProvider>
  )
}