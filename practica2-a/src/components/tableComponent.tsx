import React from "react"
import { useState } from "react"
import styled from "styled-components"
import {FaTrash} from "react-icons/fa"

type Person = {
    name: string,
    surname:string,
    dni:string
}

const TableComponent = () => {
    const [data, setData] = useState<Person[]>([]);
    const [name,setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dni, setDni] = useState("");
    const [nameInputError, setNameInputError] = useState(false)
    const [surnameInputError, setSurnameInputError] = useState(false)
    const [dniInputError, setDniInputError] = useState(false)

    return(
        <div>
            <StyledTable>
                <StyledTableHeader>Nombre</StyledTableHeader>
                <StyledTableHeader>Apellido</StyledTableHeader>
                <StyledTableHeader>DNI</StyledTableHeader>
                <StyledTableHeader></StyledTableHeader>
                {data.map((person)=> (
                    <React.Fragment key={person.dni}>

                    <StyledTableCell>{person.name}</StyledTableCell>
                    <StyledTableCell>{person.surname}</StyledTableCell>
                    <StyledTableCell>{person.dni}</StyledTableCell>
                    <StyledTableCell>
                        <StyledTrashIcon onClick={()=>{
                            setData(data.filter((p)=> p.dni !== person.dni)) 
                        }}/>
                    </StyledTableCell>
                    </React.Fragment>
                ))}
            </StyledTable>
            <br/>
            <StyledInput
            error={nameInputError}
            placeholder="name"
            type="text"
            onChange={(e:any)=>{
                if(e.target.value !== "" && nameInputError){
                    setNameInputError(false);
                }
                setName(e.target.value);
            }}
            />
            <StyledInput
            error={surnameInputError}
            placeholder="surname"
            type="text"
            onChange={(e:any)=>{
                if(e.target.value !== "" && surnameInputError){
                    setSurnameInputError(false);
                }
                setSurname(e.target.value);
            }}
            />
            <StyledInput
            error={dniInputError}
            placeholder="dni"
            type="text"
            onChange={(e:any)=>{
                if(e.target.value !== "" && dniInputError){
                    setDniInputError(false);
                }
                setDni(e.target.value);
            }}
            />
            <br/>
            <StyledButton onClick={()=>{
        // check if name, surname or dni is empty
        if (name === "") {
          setNameInputError(true);
        } else {
          setNameInputError(false);
        }
        if (surname === "") {
          setSurnameInputError(true);
        } else {
          setSurnameInputError(false);
        }

        if (dni === "") {
          setDniInputError(true);
        } else {
          setDniInputError(false);
        }

          if (name === "" || surname === "" || dni === "") {
            return;
          }

            if(data.find((person)=> person.dni === dni)){
                alert("DNI ya existe");
                return
            }

            setData([
                ...data,
                {
                    name,
                    surname,
                    dni,
                },
            ]);
        }}>
            Añadir
        </StyledButton>
        </div>
    )
};

// make styled component for css-grid table
const StyledTable = styled.div`
  border: 1px solid #ccc;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.3fr;
  grid-gap: 1px;
  background-color: #fff;
  color: #444;
  margin-bottom: 50px;
`;

// make styled component for table header
const StyledTableHeader = styled.div`
  background-color: #f1f1f1;
  font-weight: bold;
  padding: 20px;
  text-align: left;
`;

// make styled component for table cell
const StyledTableCell = styled.div`
  padding: 10px 20px 10px 20px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

// make styled StyledInput
const StyledInput = styled.input<{ error?: boolean }>`
  padding: 10px;
  margin: 5px;
  border: ${(props) => (props.error ? "1px solid red" : "1px solid #ccc")};
  border-radius: 4px;
  box-sizing: border-box;
`;

// make styled button
const StyledButton = styled.button`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledTrashIcon = styled(FaTrash)`
  color: red;
  cursor: pointer;
`;

export default TableComponent;