import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SLOT } from "@/mutations";
import styled from "styled-components";
import { GET_SLOTS } from "@/queries";
import SlotList from "@/components/slotList";
import { useState } from "react";

type FormValues = {
  day: number;
  month: number;
  year: number;
  hour: number;
};
type Fecha = {
  day: number;
  month: number;
  year: number;
};

const schema = yup.object().shape({
  day: yup.number().min(1).max(31).required("Dia requerido"),
  month: yup.number().min(1).max(12).required("Mes Requerido"),
  year: yup.number().min(2023).required("year Requerido"),
  hour: yup.number().min(8).max(20).required("Hour Requerido"),
});

const MedicoPage = () => {
  const [date, setDate] = useState<Fecha>({
    day: new Date().getDay(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [createEvent] = useMutation(ADD_SLOT);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { data, refetch, loading, error } = useQuery(GET_SLOTS, {
    variables: {
      year: date.year,
      month: date.month,
      day: date.day,
    },
  });
  if (loading) return <>Loading...</>;
  if (error) return <>Error: {error.message}</>;

  const onSubmit = (data: FormValues) => {
    createSlotHandler(data)
      .then(() => {
        console.log("Slot Created");
      })
      .catch(() => {
        alert("Error creating slot");
      });
  };
  const onSubmitConsultar = (data: FormValues) => {
    handleConsultarClick(data)
      .then(() => {
        console.log("Slot Created");
      })
      .catch(() => {
        alert("Error creating slot");
      });
  };

  const createSlotHandler = async (data: FormValues) => {
    const today = new Date();
    const dateParams = new Date(data.year, data.month - 1, data.day);
    if (dateParams < today) {
      alert("Invalid date");
      return;
    }
    setDate({
      day: data.day,
      month: data.month,
      year: data.year,
    });
    const slot = await createEvent({
      variables: {
        day: data.day,
        month: data.month,
        year: data.year,
        hour: data.hour,
      },
    });
    refetch();
    reset();
    return slot;
  };

  const handleConsultarClick = async (data: FormValues) => {
    setDate({
      day: data.day,
      month: data.month,
      year: data.year,
    });
    refetch();
  };

  return (
    <MainContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create Slot: </h2>
        <TextField
          label="day"
          variant="outlined"
          {...register("day")}
          error={!!errors.day}
          helperText={errors.day?.message}
        />
        <TextField
          label="month"
          variant="outlined"
          {...register("month")}
          error={!!errors.month}
          helperText={errors.month?.message}
        />
        <TextField
          label="year"
          variant="outlined"
          {...register("year")}
          error={!!errors.year}
          helperText={errors.year?.message}
        />
        <TextField
          label="hour"
          variant="outlined"
          {...register("hour")}
          error={!!errors.hour}
          helperText={errors.hour?.message}
        />
        <Button onClick={handleSubmit(onSubmit)}>Create</Button>
        <Button onClick={handleSubmit(onSubmitConsultar)}>Consultar</Button>
      </form>
      <SlotList doctor={true} data={data.availableSlots} refetch={refetch} />
    </MainContainer>
  );
};

export default MedicoPage;

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
