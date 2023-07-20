import { Author, Book } from "@/types";
import styled from "styled-components";

const BookDetail = ({ data, author }: { data: Book, author: Author }) => {
  return (
      <DetailContainer>
        <h3>ID: </h3>
        <p>{data._id}</p>
        <h3>Title: </h3>
        <p>{data.title}</p>
        <h3>Author: </h3>
        <p>{author.name}</p>
        <h3>pages: </h3>
        <p>{data.pages}</p>
        <h3>Created At: </h3>
        <p>{data.createdAt.toString()}</p>
      </DetailContainer>
  );
};
export default BookDetail;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: 40%;
  border: 2px solid white;
  border-radius: 2px;

  h3 {
    font-size: 25px;
    color: #0d72fe;
  }

  p {
    font-size: 20px;
    color: white;
  }
`;
