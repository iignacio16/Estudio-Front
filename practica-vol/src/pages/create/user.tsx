import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/mutations";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  name: yup.string().required("name is required"),
});

const UserCreate: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [createUser] = useMutation(CREATE_USER);

  const onSubmit = async (data: FormValues) => {
    try {
      await createUserHandler(data);
      console.log("User created");
      reset();
    } catch (error) {
      console.error(error);
      alert("Error creating user");
    }
  };

  const createUserHandler = async (data: FormValues) => {
    try {
      await createUser({
        variables: {
          input: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error creating user");
    }
  };

  return (
    <MainContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="name"
          variant="outlined"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="email"
          variant="outlined"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="password"
          variant="outlined"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          type="password"
        />

        <Button type="submit">Create</Button>
      </form>
    </MainContainer>
  );
};

export default UserCreate;

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
