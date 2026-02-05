import { useState } from "react";
import type FormData from "../interfaces/FormDataInterface";
import type ErrorsData from "../interfaces/ErrorsDataInterface";
import * as Yup from 'yup';

type Props = {
  todoUpdated: () => void; 
};

const TodoForm = ({ todoUpdated }: Props) => {

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Du måste fylla i en titel").min(3, "Titeln måste vara minst 3 tecken lång"),
    description: Yup.string().max(200, "Beskrivningen får inte överstiga 200 tecken")
  })

  const [errors, setErrors] = useState<ErrorsData>({});

  const submitForm = async (event: any) => {
    event.preventDefault();
    
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Todo skickad", formData);
      setErrors({});

      const response = await fetch('https://todo-api-8fuh.onrender.com/api/todos', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...formData, status: "ej påbörjad"}),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const createdTodo = await response.json();
    console.log("Created:", createdTodo);

    setFormData({
      title: "",
      description: "",
    });
    todoUpdated();

    } catch (errors) {
       const validationErrors: ErrorsData = {};

       if (errors instanceof Yup.ValidationError) {
         errors.inner.forEach (error => {
            const prop = error.path as keyof ErrorsData

            validationErrors[prop] = error.message;
         });
         setErrors(validationErrors);
         return;
       }
    }
  }
  
  return (
    <form onSubmit={submitForm}>
      <label htmlFor="title">Titel</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={(event) => setFormData({...formData, title: event.target.value})} />
      {errors.title && <span className="error">{errors.title}</span>}

      <label htmlFor="description">Beskrivning</label>
      <textarea id="description" name="description" value={formData.description} onChange={(event) => setFormData({...formData, description: event.target.value})}></textarea>
      {errors.description && <span className="error">{errors.description}</span>}
      <input type="submit" value="Add Todo" />
    </form>
  )
}

export default TodoForm