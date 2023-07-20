export type PlanetAPI = {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
};

export type PlanetsAPI = {
  count: number;
  next?: string;
  previous?: string;
  results: Planet[];
};

export type Planet = Omit<PlanetAPI, "residents" | "films"> & {
    residents: Array<{
        name:string
    }>
    films: Array <{
        title:string
    }>
}
