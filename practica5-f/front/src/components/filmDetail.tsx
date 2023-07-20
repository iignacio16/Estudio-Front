import { Film } from "@/types";
import Link from "next/link";
import styled from "styled-components"

const convertirARomano = (numero: number) => {
  const romanos: string[] = ["I", "II", "III", "IV", "V", "VI"];
  return romanos[numero];
};

const FilmDetail = ({ data, id }: { data?: Film; id: string }) => {
  if (!data || !id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{convertirARomano(parseInt(id))}</div>
      <p>Director: {data.director}</p>
      <p>Title: {data.title}</p>
      <p>Release date: {data.releaseDate}</p>
      <div>
        <p>Characters: </p>
        {data.characterConnection.characters.map((c) => (
          <div key={c.id}>
            <Link href={`/person/${c.id}`}>{c.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmDetail;

const StyledWindow = styled.div`
    display:flex;
    background-color: white;
    justify-content: center;

`