import React from 'react';
import { ListItem, ListItemText, Button } from '@material-ui/core';
import { db } from './firebase_config';
import { AiFillDelete } from 'react-icons/ai';
import './Todo.css';
export default function TodoListItem({ todo, inprogress, id }) {
  function toggleInProgress() {
    db.collection('todos').doc(id).update({
      inprogress: !inprogress,
    });
  }

  function deleteTodo() {
    db.collection('todos').doc(id).delete();
  }

  return (
    <div className="listItem">
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={inprogress ? 'In Progress 🌊' : 'Completed 🟢'}
        />
      </ListItem>

      <Button onClick={toggleInProgress}>
        {inprogress ? 'Done ? ✔️' : 'Pending ? ❌'}
      </Button>
      <Button onClick={deleteTodo}>
        <AiFillDelete />
      </Button>
    </div>
  );
}
