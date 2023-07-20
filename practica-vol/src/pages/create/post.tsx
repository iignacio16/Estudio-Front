import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/mutations";
import { useState } from "react";

type FormValues = {
  title: string;
  body: string;
  imageUrl: string;
};

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Body is required"),
  imageUrl: yup
    .string()
    .required("Image url is reuired")
    .url("Must be a valid url"),
});

const PostCreate: NextPage = () => {
  const [message, setMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [createPost] = useMutation(CREATE_POST);

  const onSubmit = async (data:FormValues) => {
    try{
        await createPostHandler(data);
        reset();
        setMessage("Post created succesfully!")
        setTimeout(()=>{
            setMessage(null)
        }, 3000)
    }catch(error){
        console.error(error);
        alert("Error creating Post")
    }
  }

  const createPostHandler = async (data: FormValues) => {
    try {
      await createPost({
        variables: {
          input: {
            title: data.title,
            body: data.body,
            imageUrl: data.imageUrl,
          },
        },
      });
    } catch (e) {
      console.log(e);
      throw new Error("Error creating post");
    }
  };

  return(
    <MainContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="title"
                variant="outlined"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
            />
            <TextField
                label="body"
                variant="outlined"
                {...register("body")}
                error={!!errors.body}
                helperText={errors.body?.message}
            />
            <TextField
                label="imageUrl"
                variant="outlined"
                {...register("imageUrl")}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
            />
             <Button type="submit">Create</Button>
        </form>
        {message && <SuccessMessage>{message}</SuccessMessage>}
    </MainContainer>
  )
};

export default PostCreate;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: auto;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 500px;
    border: 1px solid black;
    border-radius: 10px;
    * {
      margin: 2px;
    }
  }
`;

const SuccessMessage = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: #64eb98;
  color: white;
  border-radius: 5px;
`;
