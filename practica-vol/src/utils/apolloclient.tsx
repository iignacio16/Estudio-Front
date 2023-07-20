import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: "https://practicaopcional.deno.dev/graphql",
    cache: new InMemoryCache(),
    ssrMode: false
})

export const getClientSSR = () => new ApolloClient({
    uri:"https://practicaopcional.deno.dev/graphql",
    cache: new InMemoryCache(),
    ssrMode:true
})
