import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { GET_SLOTS } from "@/queries";
import SlotList from "@/components/slotList";
import { useEffect, useState } from "react";
import { Slot } from "@/types";

type FormValues = {
  date: Date;
};

const schema = yup.object().shape({
  date: yup.date().min(new Date()).required("Date is required"),
});

const PacientPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);

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
      year: date.getFullYear(),
      month: date.getMonth() + 1, 
      day: date.getDate(),
    },
  });

  useEffect(() => {
    if (data && data.availableSlots) {
      setSlots(data.availableSlots);
    } else {
      setSlots([]);
    }
  }, [data]);

  if (loading) return <>Loading...</>;
  if (error) return <>Error: {error.message}</>;

  const onSubmit = (data: FormValues) => {
    handleConsultarClick(data)
      .then(() => {
        console.log("Slots");
      })
      .catch(() => {
        alert("Error getting slots");
      });
  };

  const handleConsultarClick = async (data: FormValues) => {
    setDate(data.date);
    await refetch();
  };

  return (
    <MainContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create Slot: </h2>
        <input type="date" {...register("date")} />
        <Button onClick={handleSubmit(onSubmit)}>Consultar</Button>
      </form>
      <SlotList doctor={false} data={slots} refetch={refetch} />
    </MainContainer>
  );
};

export default PacientPage;

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
