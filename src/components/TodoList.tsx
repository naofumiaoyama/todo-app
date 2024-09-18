import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from '../app/store';
import TodoItem from './TodoItem';
import { updateTodos } from '../features/todos/todoSlice'; // 新しいアクションをインポート

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [sortedTodos, setSortedTodos] = useState(todos);

  useEffect(() => {
    setSortedTodos(todos);
  }, [todos]);

  const moveTodo = (dragIndex: number, hoverIndex: number) => {
    const updatedTodos = [...sortedTodos];
    const [movedTodo] = updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(hoverIndex, 0, movedTodo);
    setSortedTodos(updatedTodos);

    // 並び替えが終わった後に、新しい順序をReduxに保存
    dispatch(updateTodos(updatedTodos));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div>
          {sortedTodos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              index={index}
              todo={todo}
              moveTodo={moveTodo}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TodoList;
