import { gql } from "@apollo/client";

export const GET_SLOTS = gql`
query Query($year: Int!, $month: Int!, $day: Int) {
  availableSlots(year: $year, month: $month, day: $day) {
    day
    month
    year
    hour
    dni
    available
  }
}
`;
