import {gql} from "@apollo/client"

export const ADD_EVENT = gql`
mutation CreateEvent($title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
  createEvent(title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
    id
    title
    date
    startHour
    endHour
    description
  }
}
`

export const DELETE_EVENT = gql`
mutation DeleteEvent($id: ID!) {
  deleteEvent(id: $id) {
    id
    title
    date
    startHour
    endHour
    description
  }
}
`

export const UPDATE_EVENT = gql`
mutation UpdateEvent($id: ID!, $title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
  updateEvent(id: $id, title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
    id
    title
    startHour
    endHour
    description
    date
  }
}
`