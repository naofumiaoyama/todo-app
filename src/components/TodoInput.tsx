import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice'; // Redux action for adding a new todo
import TodoEdit from './TodoEdit';

const TodoInput: React.FC = () => {
  const [isEditOpen, setEditOpen] = useState(false);
  const dispatch = useDispatch();

  const handleAddClick = () => {
    setEditOpen(true); // ボタンをクリックしたときにTodoEditフォームを開く
  };

  const handleSave = (todo) => {
    const newTodo = {
      id: Date.now(), // 一意のIDを生成
      title: todo.title,
      description: todo.description,
      completed: false,
    };
    dispatch(addTodo(newTodo)); // Reduxに新しいタスクを追加
    setEditOpen(false); // 保存後にフォームを閉じる
  };

  return (
    <>
      <button onClick={handleAddClick} className="bg-blue-600 text-white py-2 px-4 rounded text-sm">追加</button>
      {isEditOpen && <TodoEdit todo={null} isOpen={isEditOpen} onClose={() => setEditOpen(false)} onSave={handleSave} />}
    </>
  );
};

export default TodoInput;
