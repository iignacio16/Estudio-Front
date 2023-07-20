import {gql} from "@apollo/client"

export const GET_EVENTES = gql`
query Events {
  events {
    id
    title
    description
    date
    startHour
    endHour
  }
}
`