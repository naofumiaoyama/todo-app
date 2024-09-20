// TodoInput.tsx
import React, { useState } from 'react';
import TodoEdit from './TodoEdit';

const TodoInput: React.FC = () => {
  const [isEditOpen, setEditOpen] = useState(false);

  const handleAddClick = () => {
    setEditOpen(true);
  };

  const handleSave = () => {
    setEditOpen(false); // フォームを閉じる
  };

  return (
    <>
      <button onClick={handleAddClick} className="bg-blue-600 text-white py-2 px-4 rounded text-sm">追加</button>
      {isEditOpen && <TodoEdit todo={null} isOpen={isEditOpen} onClose={() => setEditOpen(false)} onSave={handleSave} />}
    </>
  );
};

export default TodoInput;