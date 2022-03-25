import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Add from './components/Add'
import Edit from './components/Edit'

const App = () => {

  let [stocks, setStocks] = useState([])

  const getStocks = () => {
    axios.get('https://salty-oasis-93120.herokuapp.com/api/stocks')
    .then(
      (response) => setStocks(response.data),
      (err) => console.error(err.response.data)
    )
    .catch((error) => console.error(error.response.data))
  }

  const handleCreate = (newStock) => {
    axios.post('https://salty-oasis-93120.herokuapp.com/api/stocks', newStock)
    .then((response)=>{
      console.log(response)
      getStocks()
    })
  }


  const handleDelete = (event) => {
    axios
    .delete('https://salty-oasis-93120.herokuapp.com/api/stocks/' + event.target.value)
    .then((response) => {
      getStocks()
    })
  }

  const handleUpdate = (editStock) => {
    console.log(editStock)
    axios
      .put('https://salty-oasis-93120.herokuapp.com/api/stocks/' + editStock.id, editStock)
      .then((response) => {
        getStocks()
      })
  }


  useEffect(() => {
    getStocks()
  },[])


  return (
    <>
    <h1>SeekingBeta</h1>
    <Add handleCreate={handleCreate}/>

    <div className="stocks">

      {stocks.map((stock) => {
        return (
          <div className="indStock" key={stock.id}>
            <h4>{stock.headline}</h4>
            <h5>company: {stock.name}</h5>
            <Edit handleUpdate={handleUpdate} id={stock.id}/>
            <button onClick={handleDelete} value={stock.id}>X</button>
          </div>
        )
      })}
      </div>
    </>
  )
}

export default App;
