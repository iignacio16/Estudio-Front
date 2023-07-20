import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function Home() {
  const router = useRouter();

  return (
    <MainContent>
        <Button
          onClick={() => {
            router.push("/books");
          }}
        >
          Ir a Books
        </Button>
        <Button
          onClick={() => {
            router.push("/author");
          }}
        >
          Ir a Authors
        </Button>
        <Button
          onClick={() => {
            router.push("/users");
          }}
        >
          Ir a Users
        </Button>  
    </MainContent>
  );
}
const MainContent = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #282828;
`;


const Button = styled.button`
  display: flex;
  cursor: pointer;
  color: white;
  padding: 25px;
  margin: 10px;
  background-color: #0d72fe;
  border: 2px solid #0d72fe;
  border-radius: 5px;
  font-size: 25px;
`;
