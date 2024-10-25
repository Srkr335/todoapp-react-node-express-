import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import './TodoApp.css';

const TodoApp = () => {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('todoItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const storeItems = (data) => {
    const newItem = {
      description: data.input,
      completed: false,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('todoItems', JSON.stringify(updatedItems));
  };

  const deleteItem = (key) => {
    const updatedItems = items.filter((_, index) => index !== key);
    setItems(updatedItems);
    localStorage.setItem('todoItems', JSON.stringify(updatedItems));
  };

  const markAsCompleted = (key) => {
    const updatedItems = items.map((item, index) => {
      if (index === key) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
    localStorage.setItem('todoItems', JSON.stringify(updatedItems));
  };

  const startEditing = (key) => {
    setIsEditing(key);
    setEditInput(items[key].description);
  };

  const handleEditChange = (event) => {
    setEditInput(event.target.value);
  };

  const saveEdit = (key) => {
    if (editInput.trim()) {
      const updatedItems = items.map((item, index) => {
        if (index === key) {
          return { ...item, description: editInput };
        }
        return item;
      });

      setItems(updatedItems);
      setIsEditing(null);
      setEditInput('');
      localStorage.setItem('todoItems', JSON.stringify(updatedItems));
    }
  };

  return (
    <div className="todo-container">
      <TodoForm onSubmit={storeItems} />
      <Todo
        items={items}
        isEditing={isEditing}
        editInput={editInput}
        startEditing={startEditing}
        saveEdit={saveEdit}
        markAsCompleted={markAsCompleted}
        deleteItem={deleteItem}
        handleEditChange={handleEditChange}
      />
    </div>
  );
};

export default TodoApp;
