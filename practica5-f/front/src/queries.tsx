import { gql } from "@apollo/client";

export const GET_ALL_FILMS = gql`
  query allFilms {
    allFilms {
      films {
        id
        title
      }
    }
  }
`;

export const GET_FILM = gql`
  query Films($filmId: ID) {
    film(filmID: $filmId) {
      director
      title
      releaseDate
      characterConnection {
        characters {
          id
          name
        }
      }
    }
  }
`;

export const GET_ALL_PLANETS = gql`
  query AllPlanets {
    allPlanets {
      totalCount
      planets {
        name
        population
        gravity
      }
    }
  }
`;

export const GET_ALL_VEHICLES = gql`
  query AllVehicles {
    allVehicles {
      totalCount
      vehicles {
        costInCredits
        name
        model
        length
        passengers
        cargoCapacity
      }
    }
  }
`;

export const GET_PERSON = gql`
  query Person($id: ID) {
    person(id: $id) {
      name
      birthYear
      eyeColor
      gender
      height
      species {
        homeworld {
          name
        }
        name
      }
    }
  }
`;
