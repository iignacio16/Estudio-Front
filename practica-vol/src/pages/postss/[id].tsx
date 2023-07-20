import { GET_POST_ID } from "@/queries";
import { GetPost } from "@/types";
import { useQuery, useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FidgetSpinner} from "react-loader-spinner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { CREATE_COMMENT } from "@/mutations";
import { useEffect, useState } from "react";

type FormValues = {
  body: string;
  userEmail: string;
};

const schema = yup.object().shape({
  body: yup.string().required("Body is required"),
  userEmail: yup
    .string()
    .required("Email is required")
    .email("Email must be a valdi email"),
});

const PostDetail: NextPage = () => {
  const [postId, setPostId] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setPostId(id.toString());
    }
  }, [id]);
  
  const { data, loading, error, refetch } = useQuery<GetPost>(GET_POST_ID, {
    variables: {
      id,
    },
  });
  const [createComment] = useMutation(CREATE_COMMENT);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    try {
      createCommentHandler(data);
      reset();
    } catch (e) {
      console.log(e);
      throw new Error("Error creating comm");
    }
  };

  const createCommentHandler = async (data: FormValues) => {
    try {
      await createComment({
        variables: {
          input: {
            body: data.body,
            userEmail: data.userEmail,
            postId: postId,
          },
        },
      });
      refetch();
    } catch (e) {
      console.log(e);
      throw new Error("Error creating comment");
    }
  };

  return (
    <>
      {loading && <FidgetSpinner />}
      {error && <p>{error.message}</p>}
      {data && (
        <MainContainer>
          <Title>{data.post.title}</Title>
          <img src={data.post.imageUrl} width={300} height={300} />
          <Body>{data.post.body}</Body>
          <CommentsContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>Comments</h2>
                <TextField {...register("body")} label="Body" error={!!errors.body} helperText={errors.body?.message}/>
                <TextField {...register("userEmail")} label="userEmail" error={!!errors.userEmail} helperText={errors.userEmail?.message}/>
                <Button type="submit" variant="contained">Submit</Button>
            </Form>
            <span>Comentarios del post: {data.post.comments.length}</span>
            {data.post.comments.map((c)=> (
                <CommentContainer key={c.id}>
                    <h3>{c.user.name}</h3>
                    <p>{c.user.email}</p>
                    <Comment>{c.body}</Comment>
                </CommentContainer>
            ))}
          </CommentsContainer>
        </MainContainer>
      )}
    </>
  );
};

export default PostDetail;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: auto;
`;

const Title = styled.h1`
  font-family: cursive;
  font-size: 50px;
  color: violet;
`;
const Body = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 20px;
  color: violet;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 80%;

`;
const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin: 5px;
  margin-left: 10px;
  border: 2px solid greenyellow;
  border-radius: 4px;
`;

const Comment = styled.p`
  font-size: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border: 1px solid black;
  border-radius: 10px;
  * {
    margin: 10px;
  }
`;
