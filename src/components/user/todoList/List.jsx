import { useRef, useState } from 'react';
import { RecycleBin } from '../../globals/Icons';

export default function List({ todos, setTodoItems, todoItems, visiblity }) {
  console.log(visiblity);
  return (
    <div
      className={`w-full min-h-8 max-h-[300px] overflow-y-scroll flex flex-col items-center gap-2 p-2 self-start ${
        visiblity === `invisible` && `blur-sm`
      }`}
    >
      {todos.length > 0 ? (
        todos?.map((item) => {
          return (
            <TodoItem
              key={item.id}
              item={item}
              todoItems={todoItems}
              setTodoItems={setTodoItems}
            />
          );
        })
      ) : (
        <p className='text-sm text-gray-200'>یادداشتی وجود ندارد!</p>
      )}
    </div>
  );
}
export function TodoItem({ item, todoItems, setTodoItems }) {
  const todoText = useRef();
  const [blocked, setBlocked] = useState(item.blocked);
  const handleHiddenTodoItem = (event) => {
    if (event.target.checked) {
      todoItems?.forEach((todo) => {
        todo.id == event.target.id && ((todo.blocked = true), setBlocked(true));
      });
    } else {
      todoItems?.forEach((todo) => {
        todo.id == event.target.id &&
          ((todo.blocked = false), setBlocked(false));
      });
    }
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  };
  const handleRemoveTodo = () => {
    const filteredToto = todoItems?.filter((todo) => {
      return todo.id != item.id;
    });
    localStorage.setItem('todoItems', JSON.stringify(filteredToto));
    setTodoItems(filteredToto);
  };

  return (
    <div
      className={`w-full h-auto p-3 rounded-xl bg-[#fae5fa60] flex justify-between gap-3 border ${
        blocked === true && `bg-gray-50`
      }`}
    >
      <div className='flex gap-3 items-center'>
        <div className='inline-flex items-center'>
          <label className='flex items-center cursor-pointer relative'>
            <input
              checked={item.blocked === true && 'checked'}
              id={item.id}
              onClick={handleHiddenTodoItem}
              type='checkbox'
              className='peer h-5 w-5 cursor-pointer transition-all appearance-none rounded  bg-white border border-slate-300 checked:bg-gray-300 checked:border-gray-400'
            />
            <span className='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='currentColor'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </span>
          </label>
        </div>
        <p
          ref={todoText}
          className={`text-[0.8rem] ${
            blocked === true && `line-through text-gray-300`
          } `}
        >
          {item?.text}
        </p>
      </div>
      <div
        onClick={handleRemoveTodo}
        className='w-auto h-auto p-2 cursor-pointer rounded-full  hover:opacity-70'
      >
        <RecycleBin
          color={blocked === true ? `#cccccc` : `#e10000b2`}
          size={'size-5'}
        />
      </div>
    </div>
  );
}
