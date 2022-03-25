import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

const App = () => {

  let [stocks, setStocks] = useState([])

  const getStocks = () => {
    axios.get('https://salty-oasis-93120.herokuapp.com/api/stocks')
    .then(
      (response) => setStocks(response.data),
      (err) => console.error(err)
    )
    .catch((error) => console.error(error))
  }


  useEffect(() => {
    getStocks()
  },[])


  return (
    <>
    <h1>Hello</h1>

    <div className="stocks">

      {stocks.map((stock) => {
        return (
          <div className="indStock" key={stock.id}>
            <h4>{stock.headline}</h4>
            <h5>company: {stock.name}</h5>
          </div>
        )
      })}
      </div>
    </>
  )
}

export default App;
