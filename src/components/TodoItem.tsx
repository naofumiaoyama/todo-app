// src/components/TodoItem.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../features/todos/Todo';
import { toggleTodo, removeTodo } from '../features/todos/todoSlice';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          className='w-6 h-6 px-5 py-5'
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            dispatch(toggleTodo(todo.id));
            console.log(`Checkbox clicked for todo id: ${todo.id}`);  // クリック確認用ログ
          }}
        />
        <label 
          className="text-2xl px-2 py-2 w-48 truncate"  // 横幅を固定し、超過したテキストを省略
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.title}
        </label>
      </div>
      <button className="bg-blue-800 text-white px-3 py-1 rounded"
        onClick={() => {
          dispatch(removeTodo(todo.id));
          console.log(`Todo ${todo.id} removed`); // ログで確認
        }}>
        削除
      </button>
    </div>
  );
};

export default TodoItem;
