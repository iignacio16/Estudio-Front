import BookDetail from "@/components/book";
import { Author, Book } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import styled from "styled-components"

const BookIdPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState<Book>();
  const [author, setAuthor] = useState<Author>();

  const fetchData = async () => {
    try {
      const bRes = await fetch(`http://localhost:3002/getBook/${id}`);
      const bo = await bRes.json();
      setBook(bo);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    // Verificar si el libro existe antes de obtener el autor
    if (book && book.author) {
      const fetchAuthor = async () => {
        try {
          const aRes = await fetch(
            `http://localhost:3002/getAuthor/${book.author}`
          );
          const aut = await aRes.json();
          setAuthor(aut);
          if (aRes.ok) {
            console.log("Todo ok");
          } else {
            console.log("Fail");
          }
        } catch (e) {
          console.log(e);
        }
      };

      fetchAuthor();
    }
  }, [book]);

  return (
    <>
      {!author && !book && <InfinitySpin />}
      {author && book && (
        <Main>
          <BookDetail data={book} author={author} />
        </Main>
      )}
    </>
  );
};

export default BookIdPage;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #282828;
`;
