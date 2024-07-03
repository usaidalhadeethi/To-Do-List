import React, { useContext, useState } from 'react';
import './Todo.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { TodosContext } from '../../contexts/TodosContext';

export default function Todo({ todo }) {
    const {todosObject, emptySnackbarObject, deleteSnackbarObject, editSnackbarObject, completedSnackbarObject} = useContext(TodosContext);
    const [todos, setTodos] = todosObject;
    const [, setSnackbarEmpty] = emptySnackbarObject;
    const [, setDeleteSnackbar] = deleteSnackbarObject;
    const [, setEditSnackbar] = editSnackbarObject;
    const [, setCompletedSnackbar] = completedSnackbarObject;
    const [colorModal, setColorModal] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(todo.backgroundColor || "#686D76");
    const [newInput, setNewInput] = useState(todo.input);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function handleCheckBtn (e) {
        e.stopPropagation ()
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id)
                t.isCompleted=!t.isCompleted;
            return t;
        });
        setTodos(updatedTodos);
        localStorage.setItem ("todos", JSON.stringify(updatedTodos))
        if (todo.isCompleted) 
            setCompletedSnackbar (true);
    }

    function handleEditBtn(e) {
        e.stopPropagation();
        setEditDialog(true);
    }

    function handleCloseEditDialog() {
        setEditDialog(false);
    }

    function handleEditSave() {
        if (newInput === "") {
            setSnackbarEmpty(true);
            return;
        }

        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id)
                t.input = newInput;
            return t;
        });

        setTodos(updatedTodos);
        localStorage.setItem ("todos", JSON.stringify(updatedTodos))
        handleCloseEditDialog();
        setEditSnackbar (true);
    }

    function handleDeleteBtn(e) {
        e.stopPropagation();
        const updatedTodos = todos.filter((t) => t.id !== todo.id);
        setTodos(updatedTodos);
        localStorage.setItem ("todos", JSON.stringify(updatedTodos))
        setDeleteSnackbar(true);
    }


    function handleColorModal() {
        setColorModal(true);
    }

    function handleCloseColorModal() {
        setColorModal(false);
    }

    function handleColorChange(color) {
        setBackgroundColor(color);
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id)
                t.backgroundColor = color;
            return t;
        });
        setTodos(updatedTodos);
        localStorage.setItem ("todos", JSON.stringify(updatedTodos))
        handleCloseColorModal();
    }

    return (
        <>
            <Grid 
                container 
                style={{ backgroundColor, cursor: "pointer" }} 
                className="text-white mt-4 rounded items-center todo-item" 
            >
                <Grid 
                    md={8} 
                    xs={8} 
                    className='input flex h-full p-4 pr-7'
                    onClick={handleColorModal}
                >
                    <Typography variant="body1" style={{ wordBreak: 'break-word' }}>
                        {todo.input}
                    </Typography>
                </Grid>
                <Grid md={4} xs={4} className="flex items-center justify-end mt-1">
                    <IconButton 
                        aria-label="done" 
                        style={{
                            backgroundColor: todo.isCompleted ? 'green' : 'white',
                            color: todo.isCompleted ? 'white' : 'green'
                        }}
                        className='mr done-icon-button m-2 todoBtn' 
                        onClick={handleCheckBtn}
                    >
                        <DoneIcon />
                    </IconButton>

                    <IconButton 
                        aria-label="edit" 
                        style={{display: todo.isCompleted ? 'none' : 'flex'}}
                        className='mr edit-icon-button m-2 todoBtn' 
                        onClick={handleEditBtn}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton 
                        aria-label="delete" 
                        className='mr delete-icon-button m-2 todoBtn' 
                        onClick={handleDeleteBtn}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <Modal
                open={colorModal}
                onClose={handleCloseColorModal}
                aria-labelledby="color-picker-modal"
                aria-describedby="color-picker-for-todo"
            >
                <Box sx={style}>
                    <h1 id="color-picker-modal" className='mb-4 text-xl font-bold'>
                        Pick A Color
                    </h1>
                    <Grid container spacing={2}>
                        {['#686d76', '#fa0707', '#0240b0', '#0a6715', '#000000', '#816013'].map((color) => (
                            <Grid item xs={4} key={color}>
                                <Box
                                    sx={{ width: 40, height: 40, backgroundColor: color, cursor: 'pointer' }}
                                    onClick={() => handleColorChange(color)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>

            <Dialog
                open={editDialog}
                onClose={handleCloseEditDialog}
                aria-labelledby="edit-dialog"
                onClick={(e) => e.stopPropagation()}
            >
                <DialogTitle id="edit-dialog">Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Task"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newInput}
                        style={{width: "450px"}}
                        onChange={(e) => setNewInput(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleEditSave}>Save</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

