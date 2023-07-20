import { BOOK_SLOT, REMOVE_SLOT } from "@/mutations";
import { Slot } from "@/types";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useState } from "react";

const SlotList = ({
  data,
  doctor,
  refetch,
}: {
  data?: Slot[];
  doctor: boolean;
  refetch: () => Promise<any>;
}) => {
  const [dni, setDni] = useState<string>(" ");
  const [removeSlot] = useMutation(REMOVE_SLOT);
  const [bookSlot] = useMutation(BOOK_SLOT);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((slot, index) => {
        return (
          <Slot key={index}>
            <p>Day: {slot.day}</p> <p>Month: {slot.month}</p>{" "}
            <p>Year: {slot.year}</p> <p>Hour: {slot.hour}</p>{" "}
            {doctor ? (
              slot.available ? (
                <>
                  <Button
                    onClick={async () => {
                      await removeSlot({
                        variables: {
                          year: slot.year,
                          month: slot.month,
                          day: slot.day,
                          hour: slot.hour,
                        },
                      });
                      refetch();
                    }}
                  >
                    Eliminar
                  </Button>
                </>
              ) : (
                <>
                  <p>Dni: {slot.dni}</p>
                  <Elim>Booked</Elim>
                </>
              )
            ) : slot.available ? (
              <>
                <input
                  placeholder="dni"
                  type="string"
                  onBlur={(e) => {
                    setDni(e.target.value);
                  }}
                />
                <Button
                  onClick={async () => {
                    await bookSlot({
                      variables: {
                        year: slot.year,
                        month: slot.month,
                        day: slot.day,
                        hour: slot.hour,
                        dni: dni,
                      },
                    });
                    refetch();
                  }}
                >
                  Book
                </Button>
              </>
            ) : (
              <>
                <p>Dni: {slot.dni}</p>
                <Elim>Booked</Elim>
              </>
            )}
          </Slot>
        );
      })}
    </div>
  );
};

export default SlotList;

const Slot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 480px;
  margin: 5px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
`;

const Elim = styled.p`
  color: green;
  font-size: 10px;
`;
