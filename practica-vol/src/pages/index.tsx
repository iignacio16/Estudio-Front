import { GET_POSTS } from "@/queries";
import { GetPostsQuery, Post } from "@/types";
import { getClientSSR } from "@/utils/apolloclient";
import { GetServerSideProps } from "next";
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const client = getClientSSR();
    const { data } = await client.query<GetPostsQuery>({
      query: GET_POSTS,
    });

    return {
      props: {
        data: data.posts,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        hasData: false,
      },
    };
  }
};

const Home = ({ data }: { data: Post[] }) => {
  let posts: Post[] = [];
  posts = data.slice(data.length - 3);

  return (
    <MainContainer>
    <StyledList>
      <Buttons>
        <StyledButton
          onClick={() => {
            window.location.href = "/create/user";
          }}
        >
          Create user
        </StyledButton>
        <StyledButton
          onClick={() => {
            window.location.href = "/create/post";
          }}
        >
          Create post
        </StyledButton>
      </Buttons>
      {posts.map((p) => (
        <StyledPost
          key={p.id}
          onClick={() => {
            window.location.href = `/postss/${p.id}`;
          }}
        >
          <h2>Title: {p.title}</h2>
          <p>Body: {p.body}</p>
          <p>Image: </p>
          <img src={p.imageUrl} alt="Post Image" width={200} />
          <p>Created At: {p.createdAt}</p>
          <p>Updated At: {p.updatedAt}</p>
        </StyledPost>
      ))}
    </StyledList>
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
  width: auto;
  `

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #5efa9a99;
  border: 5px solid black;
  border-radius: 10px;
  height: 100vh;
  width: 80%;
`;

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ff67f5;
  border: 2px solid black;
  width: 70%;
  h2 {
    margin: 2px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 24px;
  }
  p {
    margin: 2px;
    margin-bottom: 2px;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 12px;
  }
  cursor: pointer;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #489ae2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0e3f70;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  width: 40%;
`;
