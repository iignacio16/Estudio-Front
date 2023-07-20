import React, {useState} from "react";
import styled from "styled-components"

type FormData = {
    name:string
}

type UserFormProps={
    onSubmit: (data: FormData) => void;
    initialData?: FormData;
    message?: string
};

const AuthorForm: React.FC<UserFormProps> = ({onSubmit, initialData, message})=>{
    const [formData, setFormData] = useState<FormData>(
        initialData || {
            name: ""
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async  (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await onSubmit(formData)
            setFormData({
                name: ""
            })
        }catch(error){
            console.error
        }
    }

    return(
        <Form onSubmit={handleSubmit}>
            {message && <SuccessMessage>{message}</SuccessMessage>}
            <FormInput>
                <label htmlFor="name">Name:</label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                />
            </FormInput>
            <SubmitButton type="submit">Create User</SubmitButton>
        </Form>
    )
}

export default AuthorForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid white;
  border-radius: 2px;
  padding: 20px;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    color: #0d72fe;
    margin-bottom: 5px;
  }

  input {
    padding: 5px;
    border: 1px solid #0d72fe;
    border-radius: 5px;
    width: 200px;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  background-color: #0d72fe;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;

const SuccessMessage = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: #64eb98;
  color: white;
  border-radius: 5px;
`;