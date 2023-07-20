import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: "http://localhost:8080/",
    cache: new InMemoryCache(),
    ssrMode: false
})

export const getClientSSR = () => new ApolloClient({
    uri:"http://localhost:8080/",
    cache: new InMemoryCache(),
    ssrMode:true
})
