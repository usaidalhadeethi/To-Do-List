import React, { useState, useEffect, useContext } from 'react';
import './TodoList.css';
import Todo from '../Todo/Todo';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { TodosContext } from '../../contexts/TodosContext';
import { v4 as uuidv4 } from 'uuid';

export default function TodoList({ onHeightChange }) {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const { todos, setTodos } = useContext(TodosContext);
    const [todoInput, setTodoInput] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    function handleAdd() {
        if (todoInput === "") {
            setSnackbarOpen(true);
        } else {
            const newTodo = {
                id: uuidv4(),
                input: todoInput,
                isCompleted: false,
                backgroundColor: ""
            };
            setTodos([...todos, newTodo]);
            setTodoInput("");
        }
    }

    const filteredTodos = todos.filter(todo => {
        if (selectedFilter === 'done') return todo.isCompleted;
        if (selectedFilter === 'not-done') return !todo.isCompleted;
        return true;
    });

    const todosJsx = filteredTodos.map((t) => <Todo key={t.id} todo={t} />);

    useEffect(() => {
        const todoListElement = document.getElementById('todo-list');
        if (todoListElement) {
            const todoListHeight = todoListElement.clientHeight;
            onHeightChange(todoListHeight);
        }
    }, [onHeightChange]);

    const handleFilterChange = (value) => {
        setSelectedFilter(value);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm">
                <div id='todo-list' className='my-4 md:bg-custom-light-card md:dark:bg-custom-dark-card sm:bg-transparent'>
                    <CardContent>
                        <Typography variant="h3" component="div" className='text-black dark:text-white'>
                            My Tasks
                        </Typography>
                        {/* Filter buttons */}
                        <div className="my-5">
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <button
                                        className={`py-2 px-4 border border-gray-300 dark:border-gray-600 rounded ${selectedFilter === 'all' ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white' : 'bg-transparent text-gray-500 dark:text-gray-400'}`}
                                        onClick={() => handleFilterChange('all')}
                                    >
                                        All
                                    </button>
                                </Grid>
                                <Grid item>
                                    <button
                                        className={`py-2 px-4 border border-gray-300 dark:border-gray-600 rounded ${selectedFilter === 'done' ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white' : 'bg-transparent text-gray-500 dark:text-gray-400'}`}
                                        onClick={() => handleFilterChange('done')}
                                    >
                                        Done
                                    </button>
                                </Grid>
                                <Grid item>
                                    <button
                                        className={`py-2 px-4 border border-gray-300 dark:border-gray-600 rounded ${selectedFilter === 'not-done' ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white' : 'bg-transparent text-gray-500 dark:text-gray-400'}`}
                                        onClick={() => handleFilterChange('not-done')}
                                    >
                                        Not Done
                                    </button>
                                </Grid>
                            </Grid>
                        </div>
                        {/* Filter buttons */}

                        {/* Todo components */}
                        {todosJsx}

                        {/* Adding task bar */}
                        <Grid container style={{ marginTop: "20px" }} className="border border-[#DC5F00]">
                            <Grid xs={9}>
                                <textarea
                                    placeholder='Type Your New Task'
                                    className='w-full bg-transparent p-3 focus:outline-none text-black dark:text-white resize-none '
                                    rows="1"
                                    value={todoInput}
                                    onChange={(e) => setTodoInput(e.target.value)}
                                />
                            </Grid>
                            <Grid xs={3}>
                                <button
                                    className='w-full h-full text-black dark:text-white'
                                    style={{ backgroundColor: "#DC5F00" }}
                                    onClick={handleAdd}
                                >
                                    Add Task
                                </button>
                            </Grid>
                        </Grid>
                        {/* Adding task bar */}
                    </CardContent>
                </div>
            </Container>

            {/* Snackbar for empty input notification */}
            <Snackbar 
                open={snackbarOpen} autoHideDuration={2000} 
                onClose={handleCloseSnackbar} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant="filled" severity="error">
                    You can't add an empty task !
                </Alert>
            </Snackbar>
            {/* Snackbar for empty input notification */}
        </>
    );
}
