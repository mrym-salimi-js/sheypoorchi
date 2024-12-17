import { useEffect, useState } from 'react';
import Header from './Header';
import List from './List';
import Setter from './Setter';

export default function TodoList() {
  const [visiblity, setVisiblity] = useState('visible');
  const [todos, setTodos] = useState([]);
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem('todoItems'));

    storedTodo && setTodoItems(storedTodo);
  }, []);

  useEffect(() => {
    setTodos(todoItems);
  }, [todoItems]);

  return (
    <div
      className={`w-full h-auto p-4 flex flex-col items-center justify-between  border border-purple-100 rounded-3xl bg-white`}
    >
      <div className='w-full flex flex-col gap-3 '>
        {/* Header */}
        <Header setVisiblity={setVisiblity} visiblity={visiblity} />
        {/* List */}
        <List
          setTodoItems={setTodoItems}
          todoItems={todoItems}
          todos={todos}
          visiblity={visiblity}
        />
      </div>
      {/* Setter */}
      <Setter setTodoItems={setTodoItems} todoItems={todoItems} />
    </div>
  );
}
