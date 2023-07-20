import { Person } from "@/types";

const PersonDetail = ({ data }: { data?: Person }) => {
  if (!data) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Birth year: {data.birthYear}</p>
      <p>Eye color: {data.eyeColor}</p>
      <p>Gender: {data.gender}</p>
      <p>Heigth: {data.height}</p>
      {data.species && (
        <>
          <p>Specie name: {data.species.name}</p>
          {data.species.homeworld && (
            <p>Planet where person born: {data.species.homeworld.name}</p>
          )}
        </>
      )}
    </div>
  );
};
export default PersonDetail;
