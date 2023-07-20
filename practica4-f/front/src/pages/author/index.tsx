import AuthorList from "@/components/authorList";
import { Author } from "@/types";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import styled from "styled-components";

type AuthorFetch = {
  authors: Author[];
};

const AuthorPage: NextPage = () => {
  const [page, setPage] = useState<number>(0);
  const [authors, setAuthors] = useState<Author[]>([]);

  const fetchAuthors = async () => {
    try {
      <InfinitySpin />;
      const res = await fetch(`http://localhost:3002/getAuthors?page=${page}`);
      const data: AuthorFetch = await res.json();
      setAuthors(data.authors);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    <InfinitySpin />;
    fetchAuthors();
  }, [page]);

  return (
    <Main>
      <DivButtons>
      <Link href="/author/create">
        <Button>Create Author</Button>
      </Link>
      <Link href="/">
        <Button>Back to index</Button>
      </Link>
      </DivButtons>
      <AuthorList data={authors} />
      <SelectPage>
        {page > 0 && (
          <P
            onClick={() => {
              setPage(page - 1);
            }}
          >
            PREV
          </P>
        )}

        <P>{page}</P>
        {page + 1 < authors.length && (
          <P
            onClick={() => {
              setPage(page + 1);
            }}
          >
            NEXT
          </P>
        )}
      </SelectPage>
    </Main>
  );
};

export default AuthorPage;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #282828;
`;

const SelectPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 33%;
  padding: 30px;
`;

const P = styled.p`
  cursor: pointer;
  color: purple;
  font-size: 20px;
`;

const Button = styled.button`
  display: flex;
  cursor: pointer;
  color: white;
  padding: 15px;
  margin: 10px;
  background-color: #0d72fe;
  border: 2px solid #0d72fe;
  border-radius: 5px;
  font-size: 15px;
`;

const DivButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: 20px;
  left: 20px;
  `
