export type FilmsConnection = {
  films: Film[];
};

export type Film = {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  characterConnection: FilmCharactersConnection;
};

export type FilmCharactersConnection = {
  characters: Person[];
};

export type Person = {
  id: string;
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  height: number;
  species: Species;
};

export type PlanetsConnection = {
  planets: Planet[];
  totalCount: number;
};
export type Planet = {
  name: string;
  population: number;
  gravity: string;
};

export type VehiclesConnection = {
  totalCount: number;
  vehicles: Vehicle[];
};
export type Vehicle = {
  costInCredits: number;
  name: string;
  model: string;
  length: number;
  passengers: string;
  cargoCapacity: number;
};
export type Species = {
  homeworld: Planet;
  name: string;
};

export type allFilmsQuery = {
  allFilms: FilmsConnection;
};

export type filmByIDQuery = {
  film: Film;
};

export type allPlanetsQuery = {
  allPlanets: PlanetsConnection;
};

export type allVehiclesQuery = {
  allVehicles: VehiclesConnection;
};

export type personQuery = {
    person: Person
}