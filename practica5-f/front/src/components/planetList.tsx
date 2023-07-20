import { PlanetsConnection } from "@/types";
import styled from "styled-components";

const getColorByPopulation = (population: number) => {
    if (population >= 0 && population <= 6000000) {
      return 'red';
    } else if (population > 6000000 && population <= 4500000000) {
      return 'green';
    } else {
      return 'purple';
    }
  };

const PlanetList = ({ data }: { data?: PlanetsConnection }) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>Total: {data.totalCount}</h3>
      <br />
      <h3>Planets: </h3>
      <br />
      <ul>
        {data.planets.map((planet) => (
          <li key={planet.name}>
            <Population style={{background: getColorByPopulation(planet.population)}}/>
            <p>Name: {planet.name}</p>
            <p>Population: {planet.population}</p>
            <p>Gravity: {planet.gravity}</p>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanetList;

const Population = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  `
