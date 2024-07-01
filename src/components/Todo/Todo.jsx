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
    const { todos, setTodos } = useContext(TodosContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
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

    function handleCheckClick(e) {
        e.stopPropagation();
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id)
                t.isCompleted = !t.isCompleted;
            return t;
        });
        setTodos(updatedTodos);
    }

    function handleEdit(e) {
        e.stopPropagation();
        setEditOpen(true);
    }

    function handleEditClose() {
        setEditOpen(false);
    }

    function handleEditSave() {
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id)
                t.input = newInput;
            return t;
        });
        setTodos(updatedTodos);
        handleEditClose();
    }

    function handleDelete(e) {
        e.stopPropagation();
        const updatedArray = todos.filter((t) => t.id !== todo.id);
        setTodos(updatedArray);
    }

    function handleOpen() {
        setModalOpen(true);
    }

    function handleClose() {
        setModalOpen(false);
    }

    function handleColorChange(color) {
        setBackgroundColor(color);
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id)
                t.backgroundColor = color;
            return t;
        });
        setTodos(updatedTodos);
        handleClose();
    }

    function handleColorChangeAndClose(color) {
        handleColorChange(color);
        handleClose();
    }

    return (
        <>
            <Grid 
                container 
                style={{ backgroundColor, cursor: "pointer" }} 
                className="text-white mt-4 rounded items-center todo-item" 
                onClick={handleOpen}
            >
                <Grid md={8} xs={8} className='flex h-full p-4 pr-7'>
                    <Typography variant="body1" style={{ wordBreak: 'break-word' }}>
                        {todo.input}
                    </Typography>
                </Grid>
                <Grid md={4} xs={4} className="flex items-center justify-end mt-1">
                    <IconButton aria-label="done" className='mr done-icon-button m-2 todoBtn' onClick={handleCheckClick}>
                        <DoneIcon />
                    </IconButton>
                    <IconButton aria-label="edit" className='mr edit-icon-button m-2 todoBtn' onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" className='mr delete-icon-button m-2 todoBtn' onClick={handleDelete}>
                        <DeleteOutlineIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="color-picker-modal"
                aria-describedby="color-picker-for-todo"
            >
                <Box sx={style} onClick={(e) => e.stopPropagation()}>
                    <h1 id="color-picker-modal" className='mb-4 text-xl font-bold'>
                        Pick A Color
                    </h1>
                    <Grid container spacing={2}>
                        {['#686d76', '#fa0707', '#0240b0', '#098117', '#000000', '#816013'].map((color) => (
                            <Grid item xs={4} key={color}>
                                <Box
                                    sx={{ width: 40, height: 40, backgroundColor: color, cursor: 'pointer' }}
                                    onClick={() => handleColorChangeAndClose(color)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>

            <Dialog
                open={editOpen}
                onClose={handleEditClose}
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
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleEditSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

// import React, { useContext, useState } from 'react';
// import './Todo.css';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import EditIcon from '@mui/icons-material/Edit';
// import DoneIcon from '@mui/icons-material/Done';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import { TodosContext } from '../../contexts/TodosContext';

// export default function Todo({ todo }) {
//     const { todos, setTodos } = useContext(TodosContext);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [backgroundColor, setBackgroundColor] = useState(todo.backgroundColor || "#686D76");

//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 200,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//     };

//     function handleCheckClick(e) {
//         e.stopPropagation();
//         const updatedTodos = todos.map((t) => {
//             if (t.id === todo.id)
//                 t.isCompleted = !t.isCompleted;
//             return t;
//         });
//         setTodos(updatedTodos);
//     }

//     function handleEdit() {
//         // Add your edit logic here
//     }

//     function handleDelete() {
//         const updatedArray = todos.filter((t) => t.id !== todo.id);
//         setTodos(updatedArray);
//     }

//     function handleOpen(e) {
//         setModalOpen(true);
//     }

//     function handleClose() {
//         setModalOpen(false);
//     }

//     function handleColorChange(color) {
//         setBackgroundColor(color);
//         const updatedTodos = todos.map((t) => {
//             if (t.id === todo.id)
//                 t.backgroundColor = color;
//             return t;
//         });
//         setTodos(updatedTodos);
//         handleClose();
//     }

//     function handleColorChangeAndClose(color) {
//         handleColorChange(color);
//         handleClose();
//     }

//     return (
//         <Grid 
//             container 
//             style={{ backgroundColor, cursor: "pointer" }} 
//             className="text-white mt-4 rounded items-center todo-item" 
//             onClick={handleOpen}
//         >
//             <Grid md={8} xs={8} className='flex h-full p-4'>
//                 <Typography variant="body1" style={{ wordBreak: 'break-word' }}>
//                     {todo.input}
//                 </Typography>
//             </Grid>
//             <Grid md={4} xs={4} className="flex items-center justify-end mt-1">
//                 <IconButton aria-label="done" className='mr done-icon-button m-2 p-1' onClick={handleCheckClick}>
//                     <DoneIcon />
//                 </IconButton>
//                 <IconButton aria-label="edit" className='mr edit-icon-button m-2 p-1' onClick={handleEdit}>
//                     <EditIcon />
//                 </IconButton>
//                 <IconButton aria-label="delete" className='mr delete-icon-button m-2 p-1' onClick={handleDelete}>
//                     <DeleteOutlineIcon />
//                 </IconButton>
//             </Grid>
//             <Modal
//                 open={modalOpen}
//                 onClose={handleClose}
//                 aria-labelledby="color-picker-modal"
//                 aria-describedby="color-picker-for-todo"
//             >
//                 <Box sx={style} onClick={(e) => e.stopPropagation()}>
//                     <h1 id="color-picker-modal" className='mb-4 text-xl font-bold'>
//                         Pick A Color
//                     </h1>
//                     <Grid container spacing={2}>
//                         {['#686d76','rgb(199, 13, 13)', '#0240b0', '#098117', '#000000', '#816013'].map((color) => (
//                             <Grid item xs={4} key={color}>
//                                 <Box
//                                     sx={{ width: 40, height: 40, backgroundColor: color, cursor: 'pointer' }}
//                                     onClick={() => handleColorChangeAndClose(color)}
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>
//             </Modal>
//         </Grid>
//     );
// }
// import React, { useContext, useState } from 'react';
// import './Todo.css';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import EditIcon from '@mui/icons-material/Edit';
// import DoneIcon from '@mui/icons-material/Done';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { TodosContext } from '../../contexts/TodosContext';

// export default function Todo({ todo }) {
//     const { todos, setTodos } = useContext(TodosContext);
//     const [open, setOpen] = useState(false);
//     const [editOpen, setEditOpen] = useState(false);
//     const [backgroundColor, setBackgroundColor] = useState(todo.backgroundColor || "#686D76");
//     const [newInput, setNewInput] = useState(todo.input);

//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//     };

//     function handleCheckClick(e) {
//         e.stopPropagation();
//         const updatedTodos = todos.map((t) => {
//             if (t.id === todo.id)
//                 t.isCompleted = !t.isCompleted;
//             return t;
//         });
//         setTodos(updatedTodos);
//     }

//     function handleEdit(e) {
//         e.stopPropagation();
//         setEditOpen(true);
//     }

//     function handleEditClose() {
//         setEditOpen(false);
//     }

//     function handleEditSave() {
//         const updatedTodos = todos.map((t) => {
//             if (t.id === todo.id)
//                 t.input = newInput;
//             return t;
//         });
//         setTodos(updatedTodos);
//         handleEditClose();
//     }

//     function handleDelete(e) {
//         e.stopPropagation();
//         const updatedArray = todos.filter((t) => t.id !== todo.id);
//         setTodos(updatedArray);
//     }

//     function handleOpen(e) {
//         e.stopPropagation();
//         setOpen(true);
//     }

//     function handleClose() {
//         setOpen(false);
//     }

//     function handleColorChange(color) {
//         setBackgroundColor(color);
//         const updatedTodos = todos.map((t) => {
//             if (t.id === todo.id)
//                 t.backgroundColor = color;
//             return t;
//         });
//         setTodos(updatedTodos);
//     }

//     return (
//         <Grid 
//             container 
//             style={{ backgroundColor, cursor: "pointer" }} 
//             className="text-white mt-4 rounded items-center todo-item" 
//             onClick={handleOpen}
//         >
//             <Grid md={8} xs={8} className='flex h-full p-4'>
//                 <Typography variant="body1" style={{ wordBreak: 'break-word' }}>
//                     {todo.input}
//                 </Typography>
//             </Grid>
//             <Grid md={4} xs={4} className="flex items-center justify-end mt-1">
//                 <IconButton aria-label="done" className='mr done-icon-button m-2 p-1' onClick={handleCheckClick}>
//                     <DoneIcon />
//                 </IconButton>
//                 <IconButton aria-label="edit" className='mr edit-icon-button m-2 p-1' onClick={handleEdit}>
//                     <EditIcon />
//                 </IconButton>
//                 <IconButton aria-label="delete" className='mr delete-icon-button m-2 p-1' onClick={handleDelete}>
//                     <DeleteOutlineIcon />
//                 </IconButton>
//             </Grid>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="color-picker-dialog"
//             >
//                 <DialogTitle id="color-picker-dialog">Pick a Color</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2}>
//                         {['#FF6347', '#FFD700', '#ADFF2F', '#87CEEB', '#FF69B4', '#FFFFFF', '#000000'].map((color) => (
//                             <Grid item xs={3} key={color}>
//                                 <Box
//                                     sx={{ width: 40, height: 40, backgroundColor: color, cursor: 'pointer' }}
//                                     onClick={() => handleColorChange(color)}
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Close</Button>
//                 </DialogActions>
//             </Dialog>
//             <Dialog
//                 open={editOpen}
//                 onClose={handleEditClose}
//                 aria-labelledby="edit-dialog"
//             >
//                 <DialogTitle id="edit-dialog">Edit Task</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Modify your task below:
//                     </DialogContentText>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         id="name"
//                         label="Task"
//                         type="text"
//                         fullWidth
//                         variant="standard"
//                         value={newInput}
//                         onChange={(e) => setNewInput(e.target.value)}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleEditClose}>Cancel</Button>
//                     <Button onClick={handleEditSave}>Save</Button>
//                 </DialogActions>
//             </Dialog>
//         </Grid>
//     );
// }
