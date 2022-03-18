import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [item,setItem] = useState('');
  const [items,setItems] = useState([]);
  const [amount,setAmount] = useState('');

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
    const json = JSON.stringify({description:item, amount:amount});

    axios.post(URL + 'add.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setItems(items => [...items,response.data]);
      setItem('');
      setAmount('');
    }).catch(error => {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert(error);
      }
    })
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = items.filter((item) => item.id !== id);
      setItems(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    })
  }

  return (
    <div className='container'>
      <form onSubmit={save}>
        <label>New item</label>
        <input value={item} placeholder='type description' onChange={e => setItem(e.target.value)}></input>
        <input value={amount} placeholder='type amount' onChange={e => setAmount(e.target.value)}></input>
        <button>Add</button>
      </form>
      <ol>
        {items?.map(item =>(
          <li key={item.id}>{item.description} {item.amount}&nbsp;
            <a href="#" className="delete" onClick={() => remove(item.id)}>
              Delete
            </a>
          </li>
        ))}
      </ol>
    </div>
    
  );
}

export default App;
