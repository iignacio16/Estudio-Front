import BookForm from "@/components/bookForm";
import React, { useState } from "react";
import styled from "styled-components";

type FormData = {
  author: string;
  pages: number;
  title: string;
};

const CreateBook = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);

  const createBook = async (data: FormData) => {
    try {
      const res = await fetch(`http://localhost:3002/addBook`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        console.log("Libro creado exitosamente.");
        setMessage("Book created successfully");
        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      } else {
        console.log("Errrrrrorororororor");
        setMessage("Error creating Book");
        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Main>
      <BookForm onSubmit={createBook} message={message} />
    </Main>
  );
};

export default CreateBook;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #282828;
`;
