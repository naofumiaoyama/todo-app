import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './Todo';

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      console.log(`Added new todo: ${newTodo.title}`);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        console.log(`Todo ${todo.id} completed state: ${todo.completed}`);
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      console.log(`Todo ${action.payload} removed`);
    },
    // 追加: 並べ替えたtodosリスト全体を更新するアクション
    updateTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      console.log(`Todos updated`);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, updateTodos } = todoSlice.actions;
export default todoSlice.reducer;
