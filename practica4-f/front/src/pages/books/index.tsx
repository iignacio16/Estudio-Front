import BookList from "@/components/bookList";
import { Book } from "@/types";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { styled } from "styled-components";

type BookFetch = {
  books: Book[];
};
const BooksPage: NextPage = () => {
  const [page, setPage] = useState<number>(0);
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
        <InfinitySpin/>
      const res = await fetch(`http://localhost:3002/getBooks?page=${page}`);
      const data: BookFetch = await res.json();
      setBooks(data.books);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    <InfinitySpin/>
    fetchBooks();
  }, [page]);

  return (
    <Main>
     <Link href="/books/create">
        <Button>Create Book</Button>
      </Link>
      <BookList data={books} />
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
        {(page + 1) < books.length && (
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
export default BooksPage;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  position: absolute;
  top:20px;
  left:20px;
`