export type HouseAPI = {
  id: string;
  name: string;
  houseColours: string;
  founder: string;
  animal: string;
  element: string;
  ghost: string;
  commonRoom: string;
  heads: HeadsAPI[];
  traits: TraitsAPI[];
};

export type HeadsAPI = {
  id: string;
  firstName: string;
  lastName: string;
};

export type TraitsAPI = {
  id: string;
  name: string;
};

export type ElixirWizard = {
  id: string;
  name: string;
};

export type WizardsAPI = {
  elixirs: ElixirWizard[];
  id: string;
  firstName: string;
  lastName: string;
};

export type ElixirAPI = {
  id: string;
  name: string;
  effect: string;
  sideEffects: string;
  characteristics: string;
  time:string;
  difficulty: string;
  ingredients: Ingredient[];
  inventors: Inventor[];
  manufacturer: string;
};

export type Ingredient = {
  id: string;
  name: string;
};
export type Inventor = {
  id: string;
  firstName: string;
  lastName: string;
};
