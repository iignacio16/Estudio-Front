import AuthorDeatils from "@/components/author";
import { Author, Book } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import styled from "styled-components";

type AuthorFetch = Omit<Author, "books"> & {
  books: string[];
};

const AuthorIDPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [books, setBooks] = useState<Book[]>([]);
  const [author, setAuthor] = useState<AuthorFetch>();

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3002/getAuthor/${id}`);
      const aut: AuthorFetch = await res.json();
      setAuthor(aut);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchBooks = async () => {
    if (author && author.books) {
      try {
        const bookPromise = author.books.map(async (b) => {
          const book = await fetch(`http://localhost:3002/getBook/${b}`);
          return await book.json();
        });
        const libros = await Promise.all(bookPromise);
        setBooks(libros);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [author]);

  return (
    <>
      {!author && !books && <InfinitySpin />}
      {author && (
        <Main>
          <AuthorDeatils data={author} books={books} />
        </Main>
      )}
    </>
  );
};

export default AuthorIDPage;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #282828;
`;
