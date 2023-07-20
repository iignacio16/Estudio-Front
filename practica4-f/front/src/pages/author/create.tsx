import AuthorForm from "@/components/authorForm";
import React, { useState } from "react";
import styled from "styled-components";

type FormData = {
  name: string;
};

const CreateAuthor = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [name, setName] =useState<string | undefined>(undefined)


  const createAuthor = async (data: FormData) => {
    try {
      const res = await fetch(`http://localhost:3002/addAuthor`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const responseData = await res.json()
        console.log("Author creado exitosamente.");
        setName(responseData.usr.name)
        setTimeout(()=>{
          setName(undefined)
        },3000)
        setMessage("Author Created successfully");
        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      } else {
        setMessage("Error al crear el author");
        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
        console.error("Error al crear el author");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return( 
  <Main>
    <AuthorForm onSubmit={createAuthor}  message={message}/>
    {name&& (<Name>{name}</Name>)}
  </Main>);
};

export default CreateAuthor;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #282828;
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white
`