import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  }
  else {
    return [];
  }
}

const App = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const displayAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    displayAlert(true, 'List is Empty', 'danger');
    setList([]);
  }

  const removeItem = (id) => {
    displayAlert(true, 'Item Removed', 'danger');
    setList(list.filter((item) => item.id !== id));
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setEditId(id);
    setIsEditing(true);
    setInput(specificItem.title);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit btn pressed");
    if (!input) {
      //Display Alert
      // setAlert({ show: true, msg: 'Please Enter Valid Value', type: 'danger' })
      displayAlert(true, 'Please Enter Valid Value', 'danger')
    }
    else if (input && isEditing) {
      //Editing Task
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: input };
          }
          return item;
        })
      );
      setInput('');
      setEditId(null);
      setIsEditing(false);
      displayAlert(true, 'Edited Successfully', 'success');
    }
    else {
      //Show Alert
      const newItem = { id: new Date().getTime().toString(), title: input };
      setList([...list, newItem]);
      setInput('');
      displayAlert(true, 'Item Added Successfully', 'success');
    }
  }

  //Local Storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])

  return <section>
    <div className="section-center">
      <div className="form">
        <form onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={displayAlert} list={list} />}
          <h1>Grocery Bud</h1>
          <input placeholder='e.g. eggs' type='text' id='input' name='input' value={input} onChange={(e) => setInput(e.target.value)} />
          <button className="form-btn" type='submit'>{isEditing ? 'Edit' : 'Submit'}</button>
        </form>
        {list.length > 0 &&
          <div className="grocery-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="clear-btn" onClick={() => clearList()}>Clear Items</button>
          </div>
        }
      </div>
    </div>

  </section>
}

export default App;