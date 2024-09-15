import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from '../app/store';
import TodoItem from './TodoItem';
import { Todo } from '../features/todos/Todo';
import { updateTodos } from '../features/todos/todoSlice';
import TodoEdit from './TodoEdit';  // TodoEditモーダルをインポート

const ItemType = 'TODO';

// ドラッグ可能なTodoアイテム
const DraggableTodoItem: React.FC<{
  todo: Todo;
  index: number;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
  onEdit: (todo: Todo) => void; // 編集用の関数を追加
}> = ({ todo, index, moveTodo, onEdit }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      moveTodo(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div onClick={() => onEdit(todo)} className="cursor-pointer">
        <TodoItem key={todo.id} todo={todo} />
      </div>
    </div>
  );
};

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [sortedTodos, setSortedTodos] = useState(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    setSortedTodos(todos);
  }, [todos]);

  // Todoの位置をドラッグで入れ替える処理
  const moveTodo = (dragIndex: number, hoverIndex: number) => {
    const newSortedTodos = [...sortedTodos];
    const [movedTodo] = newSortedTodos.splice(dragIndex, 1);
    newSortedTodos.splice(hoverIndex, 0, movedTodo);
    setSortedTodos(newSortedTodos);
  };

  // 並び替え後にReduxの状態を更新
  const handleDrop = () => {
    dispatch(updateTodos(sortedTodos));
  };

  // 編集モーダルを開く
  const openEditModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsEditModalOpen(true);
  };

  // 編集モーダルを閉じる
  const closeEditModal = () => {
    setSelectedTodo(null);
    setIsEditModalOpen(false);
  };

  // タスクを保存する
  const saveTodo = (updatedTodo: Todo) => {
    const updatedTodos = sortedTodos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setSortedTodos(updatedTodos);
    dispatch(updateTodos(updatedTodos)); // Reduxの状態も更新
    closeEditModal();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/* 画面全体を中央にするためのクラス */}
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
        <div>
          {sortedTodos.map((todo, index) => (
            <DraggableTodoItem
              key={todo.id}
              todo={todo}
              index={index}
              moveTodo={moveTodo}
              onEdit={openEditModal} // 編集用の関数を渡す
            />
          ))}
        </div>
        <button onClick={handleDrop} className="mt-4 bg-blue-800 text-white px-4 py-2 rounded">
          並び替えを確定
        </button>

        {/* Todo編集モーダル */}
        {selectedTodo && (
          <TodoEdit
            todo={selectedTodo}
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            onSave={saveTodo}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default TodoList;
