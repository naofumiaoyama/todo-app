import React, { useState } from 'react';

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

  // モーダルが開かれたときに初期値をセット
  React.useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  if (!isOpen || !todo) return null;

  const handleSave = () => {
    if (todo) {
      onSave({ ...todo, title, description });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4">タスク編集</h3>
        <div className="mb-4">
          <label className="block mb-2">タイトル</label>
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">説明</label>
          <textarea
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
            キャンセル
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoEdit;
