import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
    cache: new InMemoryCache(),
    ssrMode: false
})

export const getClientSSR = () => new ApolloClient({
    uri:"https://swapi-graphql.netlify.app/.netlify/functions/index",
    cache: new InMemoryCache(),
    ssrMode:true
})
