import { gql } from "@apollo/client";

export const ADD_SLOT = gql`
mutation Mutation($year: Int!, $month: Int!, $day: Int!, $hour: Int!) {
  addSlot(year: $year, month: $month, day: $day, hour: $hour) {
    day
    month
    year
    hour
    dni
    available
  }
}
`;

export const REMOVE_SLOT = gql`
mutation Mutation($year: Int!, $month: Int!, $day: Int!, $hour: Int!) {
  removeSlot(year: $year, month: $month, day: $day, hour: $hour) {
    day
    month
    year
    hour
  }
}
`;

export const BOOK_SLOT = gql`
mutation Mutation($year: Int!, $month: Int!, $day: Int!, $hour: Int!, $dni: String!) {
  bookSlot(year: $year, month: $month, day: $day, hour: $hour, dni: $dni) {
    hour
    month
    year
    day
    available
    dni
  }
}
`;
