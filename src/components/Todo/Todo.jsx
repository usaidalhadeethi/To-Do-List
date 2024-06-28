import React from 'react';
import './Todo.css'
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { TodosContext } from '../../contexts/TodosContext';
import { useContext } from 'react';


export default function Todo({todo, handleCheck}) {
    const {todos, setTodos}=useContext(TodosContext);

    function handleDelete () {
        const updatedArray = todos.filter((t) => {
            if (t.id === todo.id)
                return false;
            else
                return true;
        })
        setTodos (updatedArray);
    }

    function handleCheckClick () {
        const updatedTodos = todos.map((t)=> {
            if (t.id === todo.id) 
                t.isCompleted=!t.isCompleted;
            return t;
        })
        setTodos(updatedTodos);
    }

    return (
        <Grid container style={{backgroundColor: "#686D76"}} className="text-white mt-4 rounded">
            <Grid md={8} xs={10}>
                <p className='flex h-full items-center p-4'>{todo.input}</p>
            </Grid>
            <Grid md={4} xs={2} className="flex items-center justify-end flex-col mt-1">
                <IconButton aria-label="done" className='mr done-icon-button m-2'>
                    <DoneIcon />
                </IconButton>
                <IconButton aria-label="edit" className='mr edit-icon-button m-2'>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" className='mr delete-icon-button m-2' onClick={handleDelete}>
                    <DeleteOutlineIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
