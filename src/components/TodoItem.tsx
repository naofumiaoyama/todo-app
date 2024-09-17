import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../features/todos/Todo';
import { toggleTodo, removeTodo } from '../features/todos/todoSlice';
import TodoEdit from './TodoEdit';  // 編集フォームをインポート

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const saveTodo = (updatedTodo: Todo) => {
    // 保存処理（例：Reduxへのディスパッチなど）
    console.log('Updated Todo:', updatedTodo);
    closeEditModal();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          className='w-6 h-6 px-5 py-5'
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            dispatch(toggleTodo(todo.id));
            console.log(`Checkbox clicked for todo id: ${todo.id}`);
          }}
        />
        <label
          className="text-2xl px-2 py-2 w-48 truncate cursor-pointer"  // タイトルにクリック可能なスタイルを追加
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          onClick={openEditModal}  // タイトルをクリックしたときに編集モーダルを開く
        >
          {todo.title}
        </label>
      </div>
      <button className="bg-blue-800 text-white px-3 py-1 rounded"
        onClick={() => {
          dispatch(removeTodo(todo.id));
          console.log(`Todo ${todo.id} removed`);
        }}>
        削除
      </button>

      {/* 編集モーダル */}
      {isEditModalOpen && (
        <TodoEdit
          todo={todo}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSave={saveTodo}
        />
      )}
    </div>
  );
};

export default TodoItem;
