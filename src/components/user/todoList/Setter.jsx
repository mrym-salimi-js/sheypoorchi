import { useRef } from 'react';
import { Send } from '../../globals/Icons';

export default function Setter({ todoItems, setTodoItems }) {
  const textAreaRef = useRef();
  const handleSetTodo = () => {
    const text = textAreaRef.current?.value;

    const allTodos =
      text.trim().length > 0
        ? todoItems
          ? [
              ...todoItems,
              { id: todoItems?.length + 1, text: text, blocked: false },
            ]
          : [{ text: text, blocked: false }]
        : todoItems;

    localStorage.setItem('todoItems', JSON.stringify(allTodos));
    setTodoItems(allTodos);
    textAreaRef.current.value = '';
  };
  const handleKeyDown = (event) => {
    if (!textAreaRef.current?.value) return;
    event.key === 'Enter' && handleSetTodo();
  };
  return (
    <div className='w-full p-2 border-t flex items-center justify-center'>
      <div className='w-full flex p-2 justify-between gap-3 border rounded-2xl'>
        <div
          onClick={handleSetTodo}
          className='w-auto flex cursor-pointer hover:opacity-70  border-l p-2'
        >
          <Send color={'#5b1869'} size={'size-5 '} />
        </div>
        <textarea
          onKeyDown={handleKeyDown}
          ref={textAreaRef}
          className='w-[95%] h-full text-gray-500 text-[0.8rem] self-center outline-none'
          placeholder='نوشتن تسک جدید'
        />
      </div>
    </div>
  );
}
