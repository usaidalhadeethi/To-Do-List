import React, { useState } from 'react';
import './App.css';
import { HiMoon, HiSun } from 'react-icons/hi';
import TodoList from './components/Todolist/TodoList';
import { TodosContext } from './contexts/TodosContext';
import { v4 as uuidv4 } from 'uuid';

const todosArray = [
    {
        id: uuidv4(),
        input: 'Learn React',
        isCompleted: false,
    },
    {
        id: uuidv4(),
        input: 'Yes',
        isCompleted: false
    }
];

function App() {
    const [todos, setTodos] = useState(todosArray);
    const [dark, setDark] = useState(false);
    const [isCentered, setIsCentered] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

    const handleTodoListHeightChange = (height) => {
        setIsCentered(height <= window.innerHeight);
    };

    return (
        <div className={`App ${isCentered ? 'flex items-center justify-center' : ''} h-screen text-center bg-custom-light-app dark:bg-custom-dark-app overflow-y-auto`}>
            <button 
                onClick={darkModeHandler}
                className='absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300'
            >
                {dark ? <HiSun /> : <HiMoon />}
            </button>
            <TodosContext.Provider value={{ todos, setTodos }}>
                <TodoList onHeightChange={handleTodoListHeightChange} />
            </TodosContext.Provider> 
        </div>
    );
}

export default App;
