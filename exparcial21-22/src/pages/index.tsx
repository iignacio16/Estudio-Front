import CocktailList from "@/components/cocktails";
import { Cocktail } from "@/types";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
  }
`;

const Home: NextPage = () => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [cocktails, setCocktails] = useState<Cocktail[] | undefined>(undefined);

  useEffect(() => {
    if (name) {
      const fetchCocktail = async () => {
        try {
          const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
          );
          const cocktails= await response.json();
          setCocktails(cocktails.drinks);
          console.log(cocktails)
        } catch (e: any) {
          console.log(e)
          if ((e.status = 404)) {
            alert("cocktails not found");
          }
        }
      };
 
      fetchCocktail();
    }
  }, [name]);
  return (
    <Main>
      <Header>
        <Imagen>
          <a href="https://www.thecocktaildb.com">
            <img
              src="https://www.thecocktaildb.com/images/logo.png"
              alt="logo"
            />
          </a>
        </Imagen>
        <Formulario>
          <SearchForm>
            <Input
              type="text"
              name="s"
              autoComplete="off"
              placeholder="search"
              onBlur={(e) => {
                setName(e.target.value);
              }}
            />
          </SearchForm>
        </Formulario>
      </Header>
      <StyledCocktails>
        <Lista>
          <h1>Browse Cocktails</h1>
          {cocktails && <CocktailList data={cocktails} />}
          {!cocktails && <h3>Search a cocktail...</h3>}
        </Lista>
      </StyledCocktails>
    </Main>
  );
};

export default Home;

const Main = styled.div`
  font-family: "Open Sans", sans-serif;
  background-color: #440b25;
  line-height: 22px;
  font-size: 14px;
  min-width: 100%;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  text-align: center;
  background: #1d000d;
  padding: 20px;
`;

const Imagen = styled.div`
  display: flex;
`;

const Formulario = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Input = styled.input`
  padding: 5px;
  cursor: pointer;
  justify-content: center;
`;
const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const StyledCocktails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: auto;
  margin-top: 30px;
`;

const Lista = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  color: white;
`;
