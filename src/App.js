import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { db } from './firebase_config';
import firebase from 'firebase';
import TodoListItem from './Todo';
import './styles.css';
import { Message } from 'semantic-ui-react'

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [showError, setShowError] = useState(false);


  useEffect(() => {
    getTodos();
  }, []); // blank to run only on first launch

  function getTodos() {
    db.collection('todos').onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  }

  function addTodo(e) {
    e.preventDefault();
    if (todoInput === '') {
      setShowError(true);
    } else {
      db.collection('todos').add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput,
      });
      setShowError(false);
    }

    setTodoInput('');
  }



  return (
    <>
      <div className="App">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <h1 style={{ marginTop: '24px' }}>TO DO-LIST</h1>
          {showError &&
            <Message negative>
              <Message.Header>We're sorry we can't add empty values</Message.Header>

            </Message>}
          <form style={{ width: '90vw', maxWidth: '600px' }}>

            <TextField
              id="standard-basic"
              label="Write a Todo"
              value={todoInput}
              className='textField'
              onChange={(e) => setTodoInput(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              onClick={addTodo}
              className='button'
              style={{ marginTop: '10px' }}
            >
              Add ➕
            </Button>
          </form>

          <div style={{ width: '90vw', maxWidth: '600px', marginTop: '24px' }}>
            {todos.map((todo) => (
              <TodoListItem
                todo={todo.todo}
                inprogress={todo.inprogress}
                id={todo.id}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="footer">Made with ❤️ by Pratik</p>
    </>
  );
}

export default App;
