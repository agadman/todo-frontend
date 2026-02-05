import { useState } from "react";
import type FormData from "../interfaces/FormDataInterface";
import type ErrorsData from "../interfaces/ErrorsDataInterface";
import * as Yup from 'yup';

const TodoForm = () => {

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    status: "ej påbörjad",
  });

  const statusArr = ["ej påbörjad", "pågående", "avslutad"];

  const validationSchema = Yup.object({
    title: Yup.string().required("Du måste fylla i en titel").min(3, "Titeln måste vara minst 3 tecken lång"),
    description: Yup.string().max(200, "Beskrivningen får inte överstiga 200 tecken"),
    status: Yup.string().required("Välj status från listan")
  })

  const [errors, setErrors] = useState<ErrorsData>({});

  const submitForm = async (event: any) => {
    event.preventDefault();
    
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Todo skickad", formData);
      setErrors({});
    } catch (errors) {
       const validationErrors: ErrorsData = {};

       if (errors instanceof Yup.ValidationError) {
         errors.inner.forEach (error => {
            const prop = error.path as keyof ErrorsData

            validationErrors[prop] = error.message;
         });
         setErrors(validationErrors);
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

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={formData.status} onChange={(event) => setFormData({...formData, status: event.target.value})}>
        {statusArr.map((status, index) => (
          <option key={index} value={status}>{status}</option>
        ))}
      </select>
      {errors.status && <span className="error">{errors.status}</span>}
      <input type="submit" value="Add Todo" />
    </form>
  )
}

export default TodoForm