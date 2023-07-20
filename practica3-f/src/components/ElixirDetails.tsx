import { ElixirAPI, Ingredient, Inventor } from "@/types";

interface dataProps {
  data: ElixirAPI;
}

export const ElixirDetails: React.FC<dataProps> = ({ data }) => {
  return (
    <div>
      <p>Id: {data.id}</p>
      <p>Name: {data.name}</p>
      <p>Effect: {data.effect}</p>
      <p>Side Effect: {data.sideEffects}</p>
      <p>Characteristic: {data.characteristics}</p>
      <p>Time: {data.time}</p>
      <p>Side Effect: {data.difficulty}</p>
      <p>Ingredients:</p>
      <ul>
        {data?.ingredients?.map((ingredient: Ingredient) => (
          <li key={ingredient.name}>Name: {ingredient.name}</li>
        ))}
      </ul>
      <p>Inventors: </p>
      <ul>
        {data?.inventors?.map((inventor: Inventor) => (
          <li key={inventor.firstName}>
            {inventor.firstName} {inventor.lastName}
          </li>
        ))}
      </ul>
      <p>Manufacter: {data.manufacturer}</p>
    </div>
  );
};
