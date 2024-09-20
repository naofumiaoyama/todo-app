import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../features/todos/Todo';
import { toggleTodo, removeTodo } from '../features/todos/todoSlice';
import TodoEdit from './TodoEdit'; 
import { useDrag, useDrop } from 'react-dnd';

interface TodoItemProps {
  todo: Todo;
  index: number;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index, moveTodo }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'TODO',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TODO',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveTodo(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="flex items-center justify-between"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-center">
        <input
          className="w-6 h-6 px-5 py-5"
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
        />
        <div className='flex flex-col'>
        <label
          className="text-2xl px-2 py-1 w-48 truncate cursor-pointer"
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          onClick={openEditModal}
        >
          {todo.title}
        </label>
        
        <label
          className="text-1xl px-2 py-1 w-48"
        >
          {todo.description}
        </label>
        </div>
      </div>
      <button
        className="bg-blue-800 text-white px-3 py-1 rounded"
        onClick={() => dispatch(removeTodo(todo.id))}
      >
        削除
      </button>

      {isEditModalOpen && (
        <TodoEdit
          todo={todo}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default TodoItem;
