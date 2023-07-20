import { FilmsConnection } from "@/types";
import Link from "next/link";
import styled from "styled-components";

const convertirARomano = (numero: number) => {
  const romanos: string[] = ["I", "II", "III", "IV", "V", "VI"];
  return romanos[numero]
};

const FilmsLists = ({ data }: { data?: FilmsConnection }) => {
  if(!data){
    return <div>Loading...</div>
  }
  return (
    <StyledWindow>
    
        <ul>
          {data.films.map((f, index) => (
            <StyledElement key={f.id}>
              <Link href={`films/${index+1}`}>
                <StyledTitle>{convertirARomano(index)}</StyledTitle>
                <StyledP>{f.title}</StyledP>
                <br/>
              </Link>
            </StyledElement>
          ))}
        </ul>
      
    </StyledWindow>
  );
};

export default FilmsLists;

const StyledWindow = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
`

const StyledElement = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #c9c7c7;
  box-shadow: 0 0 20px  #343434;
  margin: 30px;
  height: 50%;
  width: auto;
`

const StyledTitle = styled.span`
  font-size: 40px;
  color: #033724;
`

const StyledP = styled.p`
  font-size: 25px;
  color: #033724;
`