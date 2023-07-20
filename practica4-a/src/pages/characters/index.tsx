import { GET_CHARACTERS } from "@/queries";
import { Character, CharacterQuery } from "@/types";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {styled } from "styled-components";

const CharactersPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([]);

  const { loading, data, error } = useQuery<CharacterQuery>(GET_CHARACTERS, {
    variables: { page, name },
  });

  useEffect(() => {
    if (data) {
      setCharacters(data.characters.results);
    } else {
      <div>No hay data</div>;
    }
  }, [page, name, data]);

  if (loading) <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <StyledWindow>
      <Menu>
        <NameInput>
          <input
            type="text"
            id="name"
            name="name"
            onBlur={(e) => {
              setName(e.target.value);
              setPage(1);
            }}
          />
        </NameInput>
        <NavPages>
          {data && data.characters.info.prev && (
            <FakeButton
              onClick={() => {
                setPage(page - 1);
              }}
            >
              PREV
            </FakeButton>
          )}
          {" |"} {page} {"| "}
          {data && data.characters.info.next && (
            <FakeButton
              onClick={() => {
                setPage(page + 1);
              }}
            >
              NEXT
            </FakeButton>
          )}
        </NavPages>
      </Menu>
      <Table>
        {characters && characters.map((c)=>(
            <CeldaTabla key={c.id}>
                <h4><Link href={`/character/${c.id}`}>{c.name}</Link></h4>
                <img src={c.image} alt={c.name} width={300} height={300}/>
            </CeldaTabla>
        ))}
      </Table>
    </StyledWindow>
  );
};

export default CharactersPage;

const StyledWindow = styled.div`
    display: flex;
`
const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 25%;
`
const NameInput = styled.div`
    display: flex;
    justify-content: center;
    margin: 15px;
`
const NavPages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 15px;
`
const Table = styled.div`
display: grid;
grid-template-columns: auto auto auto auto;
grid-gap: 1px;
background-color: aquamarine;
`
const CeldaTabla = styled.div`
padding: 10px 10px 10px 10px;
text-align: center;
`

const FakeButton = styled.div`
  cursor: pointer;
  color: black;
`;
