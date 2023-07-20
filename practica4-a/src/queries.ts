import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
    query characters($page:Int,$name:String){
        characters(page: $page, filter: {name: $name}) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          image
        }
        }
    }
`;

export const GET_LOCATION = gql`
    query location($id:ID!){
        location(id: $id){
            name
            dimension
            residents{
                id
                name
            }
        }
    }
`

export const GET_EPISODES = gql`
    query episode($id:ID!){
        episode(id: $id){
            name
            air_date
            characters{
                id
                name
            }
        }
    }
`

export const CHARACTER_ID = gql`
    query character($id:ID!){
        character(id: $id){
            id
            name
            image
            location{
                id
                name
            }
            gender
            episode{
                id
                name
            }
        }
    }
`

export const GET_ALL_IDS = gql`
    query getAllID{
        characters{
            info{
                count
            }
        }
    }
`