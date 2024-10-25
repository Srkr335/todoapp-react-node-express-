// src/components/TodoComponents/Todo.js

import React from 'react';

const Todo = ({ items, isEditing, editInput, startEditing, saveEdit, markAsCompleted, deleteItem, handleEditChange }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} className={item.completed ? 'completed' : ''}>
          {isEditing === index ? (
            <>
              <input
                type="text"
                value={editInput}
                onChange={handleEditChange}
              />
              <button onClick={() => saveEdit(index)}>Save</button>
            </>
          ) : (
            <>
              <span>{item.description}</span>

              <button onClick={() => startEditing(index)}>
                <i className="fa-solid fa-pencil-alt"></i> Edit
              </button>

              <button onClick={() => markAsCompleted(index)}>
                {item.completed ? 'Undo' : 'Done'}
              </button>

              <i
                className="fa-solid fa-trash-can"
                onClick={() => deleteItem(index)}
              ></i>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Todo;
