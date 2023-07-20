import { Cocktail } from "@/types";
import styled from "styled-components";

const CocktailList = ({ data }: { data: Cocktail[] }) => {
    if(!data || !Array.isArray(data)){
        return <div>No hay data...</div>
    }
  return (
    <List>
        {data.map((c)=>(
            <Cell key={c.idDrink}>
                {c.strDrinkThumb && (
                    <img src={c.strDrinkThumb} width={200} height={200}/>
                )}
              
                <p>{c.strDrink}</p>
            </Cell>
        ))}
    </List>
  );
};

export default CocktailList;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  padding: 35px 35px 35px 35px;
  text-align: center;
  justify-content: center;
`;
