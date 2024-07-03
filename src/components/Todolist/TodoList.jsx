import React, { useState, useEffect, useContext, useMemo } from 'react';
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
    const { todosObject, emptySnackbarObject, deleteSnackbarObject, editSnackbarObject, completedSnackbarObject } = useContext(TodosContext);
    const [todos, setTodos] = todosObject;
    const [snackbarEmpty, setSnackbarEmpty] = emptySnackbarObject;
    const [deleteSnackbar, setDeleteSnackbar] = deleteSnackbarObject;
    const [editSnackbar, setEditSnackbar] = editSnackbarObject;
    const [completedSnackbar, setCompletedSnackbar] = completedSnackbarObject;
    const [snackbarAdd, setSnackbarAdd] = useState(false);
    const [todoInput, setTodoInput] = useState("");

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storageTodos);
    }, [setTodos]);

    function handleAdd() {
        if (todoInput === "") {
            setSnackbarEmpty(true);
        } else {
            const newTodo = {
                id: uuidv4(),
                input: todoInput,
                isCompleted: false,
            };
            const updatedTodos = [...todos, newTodo];
            setTodos(updatedTodos);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            setTodoInput("");
            setSnackbarAdd(true);
        }
    }

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            if (selectedFilter === 'done') return todo.isCompleted;
            else if (selectedFilter === 'not-done') return !todo.isCompleted;
            else return true;
        });
    }, [todos, selectedFilter]);

    const todosJsx = filteredTodos.map((t) => <Todo key={t.id} todo={t} />);

    useEffect(() => {
        const todoListElement = document.getElementById('todo-list');
        if (todoListElement) {
            const todoListHeight = todoListElement.clientHeight;
            onHeightChange(todoListHeight);
        }
    }, [onHeightChange]);

    function handleFilterChange(value) {
        setSelectedFilter(value);
    }

    function handleCloseSnackbarEmpty() {
        setSnackbarEmpty(false);
    }

    function handleCloseSnackbarAdd() {
        setSnackbarAdd(false);
    }

    function handleCloseDeleteSnackbar() {
        setDeleteSnackbar(false);
    }

    function handleCloseEditSnackbar() {
        setEditSnackbar(false);
    }

    function handleCloseCompletedSnackbar() {
        setCompletedSnackbar(false);
    }

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
                open={snackbarEmpty}
                autoHideDuration={2000}
                onClose={handleCloseSnackbarEmpty}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert variant="filled" severity="error">
                    You can't add an empty task !
                </Alert>
            </Snackbar>
            {/* Snackbar for empty input notification */}

            {/* Snackbar for adding task notification */}
            <Snackbar
                open={snackbarAdd}
                autoHideDuration={2000}
                onClose={handleCloseSnackbarAdd}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert variant="filled" severity="success">
                    Task is added successfully
                </Alert>
            </Snackbar>
            {/* Snackbar for empty input notification */}

            {/* Snackbar for delete notification */}
            <Snackbar
                open={deleteSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseDeleteSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert variant="filled" severity="error">
                    Task is deleted successfully
                </Alert>
            </Snackbar>
            {/* Snackbar for delete notification */}

            {/* Snackbar for successful edit notification */}
            <Snackbar
                open={editSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseEditSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert variant="filled" severity="info">
                    Task is edited successfully
                </Alert>
            </Snackbar>
            {/* Snackbar for successful edit notification */}

            {/* Snackbar for completed notification */}
            <Snackbar
                open={completedSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseCompletedSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert variant="filled" severity="success">
                    Task is added to completed tasks successfully
                </Alert>
            </Snackbar>
            {/* Snackbar for completed notification */}
        </>
    );
}
