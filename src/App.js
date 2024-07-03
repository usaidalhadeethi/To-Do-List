import React, { useState ,useEffect } from 'react';
import './App.css';
import { HiMoon, HiSun } from 'react-icons/hi';
import TodoList from './components/Todolist/TodoList';
import { TodosContext } from './contexts/TodosContext';

const todosArray = [];

function App() {
    const [todos, setTodos] = useState(todosArray);
    const [snackbarEmpty, setSnackbarEmpty] = useState(false);
    const [deleteSnackbar, setDeleteSnackbar] = useState(false);
    const [editSnackbar, setEditSnackbar] = useState(false);
    const [completedSnackbar, setCompletedSnackbar] = useState(false);
    const [dark, setDark] = useState(false);
    const [isCentered, setIsCentered] = useState(false);

    useEffect(() => {
        const darkMode = JSON.parse(localStorage.getItem("dark"));
        if (darkMode !== null) {
            setDark(darkMode);
            if (darkMode) document.body.classList.add("dark");
        }
    }, []);

    const darkModeHandler = () => {
        setDark((prevDark) => {
            const newDark = !prevDark;
            localStorage.setItem("dark", JSON.stringify(newDark));
            if (newDark) document.body.classList.add("dark");
            else document.body.classList.remove("dark");
            return newDark;
        });
    };
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
            <TodosContext.Provider value={{ 
                todosObject : [todos, setTodos], 
                emptySnackbarObject: [snackbarEmpty, setSnackbarEmpty],
                deleteSnackbarObject: [deleteSnackbar, setDeleteSnackbar],
                editSnackbarObject: [editSnackbar, setEditSnackbar],
                completedSnackbarObject: [completedSnackbar, setCompletedSnackbar]
            }}>
                <TodoList onHeightChange={handleTodoListHeightChange} />
            </TodosContext.Provider> 
        </div>
    );
}

export default App;
