// TodoList.tsx (編集モーダル部分を削除)

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from '../app/store';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [sortedTodos, setSortedTodos] = useState(todos);

  useEffect(() => {
    setSortedTodos(todos);
  }, [todos]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div>
          {sortedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TodoList;
