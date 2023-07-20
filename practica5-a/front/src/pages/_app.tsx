import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/utils/apolloServer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
