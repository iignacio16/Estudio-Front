import { Author, Book } from "@/types";
import styled from "styled-components";
type AuthorFetch = Omit<Author, "books"> & {
    books: string[];
  };

const AuthorDeatils = ({data, books}:{data:AuthorFetch, books: Book[]})=>{
    return(
        <DetailContainer>
            <h3>ID: </h3>
            <p>{data._id}</p>
            <h3>Name:</h3>
            <p>{data.name}</p>
            <h3>Books: </h3>
            {books.map((b)=>(
                    <p key={b._id}>Book title: {b.title}</p>
            ))}
         
            <h3>Created At: </h3>
            <p>{data.createdAt.toString()}</p>
        </DetailContainer>
    )
}

export default AuthorDeatils;

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