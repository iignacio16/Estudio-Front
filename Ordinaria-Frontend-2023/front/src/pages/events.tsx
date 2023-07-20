import { NextPage } from "next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EVENTES } from "@/queries";
import { Event, getEventsQuery } from "@/types";
import { ADD_EVENT, DELETE_EVENT, UPDATE_EVENT } from "@/mutations";
import styled from "styled-components";
import { useEffect, useState } from "react";

type FormValues = {
  title: string;
  description: string;
  date: Date;
  startHour: number;
  endHour: number;
};
const today = new Date();
const minimumDate: Date = new Date(today);
minimumDate.setHours(8, 0, 0, 0);
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  date: yup
    .date()
    .required("Date is required")
    .min(minimumDate, "Date must be after today at 8:00 AM"),
  startHour: yup.number().required("Start hour is required").min(1).max(23),
  endHour: yup
    .number()
    .required("End hour is required")
    .test(
      "is-greater",
      "End hour must be greater than start hour",
      function (value) {
        const { startHour } = this.parent;
        return value > startHour;
      }
    ),
});

const Events: NextPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageDelete, setMessageDelete] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const { data, loading, error, refetch } =
    useQuery<getEventsQuery>(GET_EVENTES);
  const [createEvent] = useMutation(ADD_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [updateEvent] = useMutation(UPDATE_EVENT);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    try {
      if (data) {
        setEvents(data.events);
      } else {
        setEvents([]);
      }
    } catch (e) {
      console.log(e);
      setEvents([]);
    }
  }, [data]);

  const onSubmit = (data: FormValues) => {
    try {
      createEventHandler(data);
    } catch (error) {
      console.error(error);
      alert("Error creating Post");
    }
  };

  const createEventHandler = async (data: FormValues) => {
    try {
      const selectedDate = new Date(data.date);
      const selectedStartTime = data.startHour;
      const selectedEndTime = data.endHour;

      const overlappingEvent = events.find((event: Event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate() &&
          ((event.startHour <= selectedStartTime &&
            event.endHour > selectedStartTime) ||
            (event.startHour < selectedEndTime &&
              event.endHour >= selectedEndTime) ||
            (event.startHour >= selectedStartTime &&
              event.endHour <= selectedEndTime))
        );
      });

      if (overlappingEvent) {
        alert("Evento solapado");
        return;
      }

      if (!editEvent) {
        await createEvent({
          variables: {
            title: data.title,
            description: data.description,
            date: data.date,
            startHour: data.startHour,
            endHour: data.endHour,
          },
        });
      } else {
        await updateEvent({
          variables: {
            id: editEvent.id,
            title: data.title,
            description: data.description,
            date: data.date,
            startHour: data.startHour,
            endHour: data.endHour,
          },
        });
        setEditEvent(null);
      }
      refetch();
      reset();
      setMessage(
        editEvent
          ? "Event updated successfully!"
          : "Event created successfully!"
      );
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (e) {
      console.log(e);
      throw new Error("Error creating/updating Event");
    }
  };

  return (
    <MainContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="title"
          type="text"
          {...register("title")}
          label="title"
          variant="outlined"
          error={!!errors.title}
          helperText={errors.title?.message}
          placeholder={editEvent ? editEvent.title : ""}
        />
        <TextField
          id="description"
          type="text"
          {...register("description")}
          label="description"
          variant="outlined"
          error={!!errors.description}
          helperText={errors.description?.message}
          placeholder={editEvent ? editEvent.description : " "}
        />
        <TextField
          id="date"
          type="date"
          {...register("date")}
          label="date"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
        }}
          error={!!errors.date}
          helperText={errors.date?.message}
          placeholder={editEvent ? editEvent.date.toString() : " "}
        />
        <TextField
          id="startHour"
          type="startHour"
          label="startHour"
          {...register("startHour")}
          variant="outlined"
          error={!!errors.startHour}
          helperText={errors.startHour?.message}
          placeholder={editEvent ? editEvent.startHour.toString() : " "}
        />
        <TextField
          id="endHour"
          type="endHour"
          label="endHour"
          {...register("endHour")}
          variant="outlined"
          error={!!errors.endHour}
          helperText={errors.endHour?.message}
          placeholder={editEvent ? editEvent.endHour.toString() : ""}
        />
        <Button type="submit">
          {editEvent ? "Modificar evento" : "Crear evento"}
        </Button>
      </form>
      {message && <SuccessMessage>{message}</SuccessMessage>}
      {messageDelete && <SuccessMessage>{messageDelete}</SuccessMessage>}
      <br />
      <h2>Events: </h2>
      {loading && <InfinitySpin />}
      {error && <StyledError>Error: {error.message}</StyledError>}
      <StyledEvents>
        {data &&
          data.events.filter(e => new Date(e.date) >= new Date())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((event) => (
            <StyledEvent key={event.id}>
              <h4>{event.title}</h4>
              <p>Description: {event.description}</p>
              <p>Date: {event.date.toString()}</p>
              <p>Start Hour: {event.startHour}</p>
              <p>End Hour: {event.endHour}</p>
              <Button
                onClick={async () => {
                  await deleteEvent({
                    variables: {
                      id: event.id,
                    },
                  });
                  setMessageDelete("Event deleted succesfully!");
                  setTimeout(() => {
                    setMessageDelete(null);
                  }, 3000);
                  refetch();
                }}
              >
                Eliminar
              </Button>
              <Button
                onClick={async () => {
                  await setEditEvent(event);
                }}
              >
                Modificar
              </Button>
            </StyledEvent>
          ))}
      </StyledEvents>
    </MainContainer>
  );
};
export default Events;
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: auto;
  height: auto;

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

const StyledEvents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 3px;
  background-color: #dbffff;
  width: 100vw;
  border: 1px solid black;
  border-radius: 4px;
`;
const StyledEvent = styled.div`
  padding: 10px 20px 10px 20px;
  text-align: center;
  border: 1px solid #ffc7f8;
`;

const StyledError = styled.div`
  display: flex;
  text-align: center;
  padding: 2px 2px;
  color: red;
  border: 1px solid black;
`;
