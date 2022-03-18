import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [item,setItem] = useState('');
  const [items,setItems] = useState([]);

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data);
      }).catch(error => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert(error);
        }
      });
  }, [])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item});
    axios.post(URL + 'add.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setItems(items => [...items,response.data]);
      setItem('');
    }).catch(error => {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert(error);
      }
    })
  }

  return (
    <div className='container'>
      <form onSubmit={save}>
        <label>New item</label>
        <input value={item} placeholder='Add a new item' onChange={e => setItem(e.target.value)}></input>
        <button>Save</button>
      </form>
      <ol>
        {items?.map(item =>(
          <li key={item.id}>{item.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
