import React, { useState } from "react";
import styled from "styled-components";

type FormData = {
  author: string;
  pages: number;
  title: string;
};

type BookFormProps = {
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
  message?:string
};

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData, message }) => {
  const [formData, setFormData] = useState<FormData>(
    initialData || {
      author: "",
      pages: 0,
      title: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);

    } catch (error) {

    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {message && <SuccessMessage>{message}</SuccessMessage>}
      <FormInput>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
      </FormInput>
      <FormInput>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author"
        />
      </FormInput>
      <FormInput>
        <label htmlFor="pages">Pages:</label>
        <input
          type="number"
          id="pages"
          name="pages"
          value={formData.pages}
          onChange={handleChange}
          placeholder="Enter pages"
        />
      </FormInput>
      <SubmitButton type="submit">Create Book</SubmitButton>
    </Form>
  );
};

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

export default BookForm;
