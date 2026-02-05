import { useState } from "react";
import type FormData from "../interfaces/FormDataInterface";
import type ErrorsData from "../interfaces/ErrorsDataInterface";

const TodoForm = () => {

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    status: "ej påbörjad",
  });

  const statusArr = ["ej påbörjad", "pågående", "avslutad"];

  const [errors, setErrors] = useState<ErrorsData>({});

  const validateForm = ((data: FormData) => {
    const validationErrors: ErrorsData = {};

    if (!data.title.trim()) {
      validationErrors.title = "Title is required";
    }

    if (!data.description.trim()) {
      validationErrors.description = "Description is required";
    }

    if (!statusArr.includes(data.status)) {
      validationErrors.status = "Invalid status selected";
    }

    return validationErrors;
  })

  const submitForm = ((event: any) => {
    event.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      //skicka data till API
    }
  })
  
  return (
    <form onSubmit={submitForm}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={(event) => setFormData({...formData, title: event.target.value})} />
      {errors.title && <span className="error">{errors.title}</span>}

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" value={formData.description} onChange={(event) => setFormData({...formData, description: event.target.value})}></textarea>
      {errors.description && <span className="error">{errors.description}</span>}

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={formData.status} onChange={(event) => setFormData({...formData, status: event.target.value})}>
        {statusArr.map((status, index) => (
          <option key={index} value={status}>{status}</option>
        ))}
      </select>
      <input type="submit" value="Add Todo" />
    </form>
  )
}

export default TodoForm