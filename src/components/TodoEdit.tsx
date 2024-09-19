import React, { useState, useEffect } from 'react';
import { updateTodo } from '../features/todos/todoSlice';
import { useDispatch } from 'react-redux';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoEditProps {
  todo: Todo | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTodo: Todo) => void;
}

const TodoEdit: React.FC<TodoEditProps> = ({ todo, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setTitle(todo?.title || ''); // 新規の場合は空のタイトル
      setDescription(todo?.description || ''); // 新規の場合は空の説明
    }
  }, [isOpen, todo]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      const updatedTodo = todo ? { ...todo, title, description } : { id: Date.now(), title, description, completed: false };
      dispatch(updateTodo(updatedTodo)); // 新しいタスクまたは編集されたタスクを保存
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h3 className="text-xl mb-4">Add/Edit Task</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full mb-4 px-2 py-1 border"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full mb-4 px-2 py-1 border"
        />
        <button onClick={handleSave} className="bg-blue-600 text-white py-2 px-4 rounded">Save</button>
        <button onClick={onClose} className="ml-2 py-2 px-4 rounded">Cancel</button>
      </div>
    </div>
  );
};

export default TodoEdit;
