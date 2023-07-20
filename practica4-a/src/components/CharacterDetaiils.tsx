import { Character } from "@/types";
import Link from "next/link";

const CharacterDetails = ({ data }: { data?: Character }) => {
  if (!data) {
    return <div>Esperando...</div>;
  }
  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} height={400} width={400} />
      <p>
        <Link href={`/location/${data.location.id}`}>
          Ubicacion: {data.location.name}
        </Link>
      </p>
      <p>Genero: {data.gender}</p>
      <ul>
        <h5>Episodes: </h5>
        {data.episode.map((e, index) => (
          <li key={index}>
            <Link href={`/episode/${e.id}`}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetails;
