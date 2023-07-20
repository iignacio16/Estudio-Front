export type Info = {
  count: number;
  pages: number;
  next?: number;
  prev?: number;
}

export type Character= {
    id: string,
    name: string,
    image:string,
    location: Locations,
    gender:string,
    episode:Episode[]
};

export type CharacterAPI = {
    info: Info,
    results: Character[]
}

export type CharacterQuery = {
    characters: CharacterAPI
}

export type  CharacterIDQuery = {
    character: Character
}
export type Locations = {
    id:string
    name:string,
    dimension:string,
    residents: Character[]
}

export type LocationQuery = {
    location: Locations
}

export type Episode = {
    id:string,
    name:string,
    air_date:string,
    characters: Character[]
}

export type EpisodeQuery = {
    episode: Episode
}