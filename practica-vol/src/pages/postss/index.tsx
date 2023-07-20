import { GET_POSTS } from "@/queries";
import { GetPostsQuery } from "@/types";
import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";

const AllPostsPage: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);

  const { data, loading, error } = useQuery<GetPostsQuery>(GET_POSTS, {
    variables: {
      limit: 1,
      page: page,
    },
  });
  if (loading) return <Bars />;
  if (error) return <>Error: {error.message}</>;

  return (
    <MainContainer>
      <StyledButton
        onClick={() => {
          router.push("create/post");
        }}
      >
        Añadir Post
      </StyledButton>
      {data && (
        <>
          {data.posts.map((p) => (
            <StyledPost
              key={p.id}
              onClick={() => {
                router.push(`postss/${p.id}`);
              }}
            >
              <h1>{p.title}</h1>
              <span>Body:</span>
              <p>{p.body}</p>
              <span>Image:</span>
              <img src={p.imageUrl} alt={p.id} width={300} height={300} />
              <span>Created At:</span>
              <p>{p.createdAt}</p>
              <span>updated At:</span>
              <p>{p.updatedAt}</p>
            </StyledPost>
          ))}
        </>
      )}
      {data && data.posts.length === 0 && <p>No hay posts</p>}
      <Pagination>
        {page > 0 && (
          <StyledPagination
            onClick={() => {
              setPage(page - 1);
            }}
          >
            PREV
          </StyledPagination>
        )}{" "}
        <input
          type="text"
          placeholder={page.toString()}
          onBlur={(e) => {
            setPage(parseInt(e.target.value));
          }}
        />
        {" "}
        {data && (
          <StyledPagination
            onClick={() => {
              setPage(page + 1);
            }}
          >
            NEXT
          </StyledPagination>
        )}
      </Pagination>
    </MainContainer>
  );
};

export default AllPostsPage;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
`;

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 70%;
  height: 70%;
  background-color: beige;
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: 0 0 20px black;
  h1 {
    font-family: cursive;
    font-size: 50px;
    color: violet;
  }
  span {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    font-size: 25px;
    color: violet;
  }
`;

const StyledPagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
  color: yellowgreen;
  cursor: pointer;

  &:hover {
    background-color: #5e8511;
  }
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #489ae2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin: 20px;
  &:hover {
    background-color: #0e3f70;
  }
`;

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 20%;
`;
