// src/components/TodoInput.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';

const TodoInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      console.log('Dispatching addTodo:', title); // 追加
      dispatch(addTodo(title));
      setTitle('');
    }
  };

  return (
    <form className="flex items-center" onSubmit={handleSubmit}>
      <input
        className='px-3 mr-4'
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タスクを入力"
      />
      <button type="submit" className = "bg-blue-600 text-white py-2 px-4 rounded text-sm">追加</button>
    </form>
  );
};

export default TodoInput;
