
import React from 'react';
import { useForm } from 'react-hook-form';

const TodoForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className="input-section" onSubmit={handleSubmit(submitForm)}>
      <h1>Todo App</h1>
      <input
        type="text"
        {...register('input', { required: 'This field is required', minLength: { value: 3, message: 'Must be at least 3 characters long' } })}
        placeholder="Enter Items..."
      />
      {errors.input && <p className="error-message">{errors.input.message}</p>} {}
      <button type="submit">Add Item</button>
    </form>
  );
};

export default TodoForm;
