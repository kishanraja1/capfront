
//////////////// COMPONENTS AND REACT //////////////////////
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Add from './components/Add'
import Edit from './components/Edit'
import Head from './components/Head'
import News from './components/News'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { AiFillDelete } from "react-icons/ai"
import {FaChevronCircleUp,FaChevronCircleDown} from 'react-icons/fa'


/////////////// MUI ///////////////////
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'

/////////////// REACT ROUTER //////////////////////////
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

const App = () => {

  let [stocks, setStocks] = useState([])
  let [index, setIndex] = useState([])
  let [stockPrice, setStockPrice] = useState('')
  const [query, setQuery] = useState('')

///// MUI for modals
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const API_KEY = process.env.REACT_APP_YAHOO_KEY;

  ////////////////// CRUD FUNCTIONS ??????????????????????

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

  const handleDelete2 = (deletedStock) => {
    axios
    .delete('https://salty-oasis-93120.herokuapp.com/api/stocks/' + deletedStock.id)
    .then((response) => {
      getStocks()
    })
  }

  const handleUpdate = (editStock) => {
    console.log(editStock.id)
    console.log('https://salty-oasis-93120.herokuapp.com/api/stocks/' + editStock.id)
    axios
    .put('https://salty-oasis-93120.herokuapp.com/api/stocks/' + editStock.id, editStock)
      .then((response) => {
        getStocks()
      })
  }

////////////////// YAHOO API ////////////////////////
// https://www.yahoofinanceapi.com/tutorial got guidance on using the api
  const getIndexData = () => {
    let options = {
    method: 'GET',
    url: 'https://yfapi.net/v6/finance/quote/marketSummary?lang=en&region=US',
    params: {modules: 'defaultKeyStatistics,assetProfile'},
    headers: {
      'x-api-key': API_KEY
    }
  }

    axios.request(options).then(function (response) {
      setIndex(response.data.marketSummaryResponse.result)
    }).catch(function (error) {
    	console.error(error);
    });
  }


  const getStockData= (symbol) => {
    let options = {
    method: 'GET',
    url: 'https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=' + (symbol),
    params: {modules: 'defaultKeyStatistics'},
    headers: {
      'x-api-key': API_KEY
    }
  }

  axios.request(options).then(function (response) {
    setStockPrice(response.data.quoteResponse.result[0].regularMarketPrice)
  }).catch(function (error) {
    console.error(error);
  });

  }


///////////// SEARCH BAR ///////////////////////
  const handleSearch = (e) => {
    let lowerCaseSearch = e.target.value.toLowerCase()
    setQuery(lowerCaseSearch)
  }


////////////// Map My API /////////////////////////
  const stocksMap = stocks.map((stock) => {
  if (stock.headline.toLowerCase().includes(query) || stock.ticker.toLowerCase().includes(query) || stock.industry.toLowerCase().includes(query)) {
  return(
  <div className="stocks" key={stock.id}>
  <div>
    <div className="postContainer">
      <h1>{stock.headline}</h1>
      <p>Company: {stock.name} ({stock.ticker})</p>
      <p>Price: ${stock.price}</p>
      <p>Industry: {stock.industry}</p>
      <p>Opinion: {stock.opinion}</p>
      <div className='editAndDelete'>
      <Edit handleUpdate={handleUpdate} stock={stock} id={stock.id}/>
      <DeleteIcon className='endButton' aria-label="delete" onClick={() => {handleDelete2(stock)}}/>
      </div>
    </div>
  </div>
  </div>
  )}
})

    // <p>Price: {getStockData(stock.ticker)} : {stockPrice}</p>


  useEffect(() => {
    getStocks();
    getIndexData()
  },[])


  return (
    <>
    <Router>
    <Head handleSearch={handleSearch}/>
    <Switch>
    <Route path = '/news'>
    <News handleSearch={handleSearch} query={query}/>
    </Route>
    <Route path = '/'>
    <div className = "container">
    <section className="indexInfo" id="indexInfo">
    <h2>Market Data</h2>
    <div className = "stockIndex">
      {index.map((i) => {
        return(
          <div className="singleIndex" key={i.index}>
            {i.regularMarketChange.raw > 0 ? <h5 className='posChange'>{i.shortName} : {i.regularMarketPrice.fmt}</h5> : <h5 className='negChange'>{i.shortName} : {i.regularMarketPrice.fmt}</h5>}

            {i.regularMarketChange.raw > 0 ? <h5 className='posChange'> <FaChevronCircleUp className='posChange'/>{i.regularMarketChange.fmt}</h5> : <h5 className='negChange'> <FaChevronCircleDown className='negChange'/> {i.regularMarketChange.fmt}</h5>}
          </div>
        )
      })}
    </div>
    </section>
    <section id="posts">
    <Add className='addButton' handleCreate={handleCreate}/>
    <div className='stockContainer'>
      {stocksMap}
    </div>
    </section>
    </div>
    </Route>
    </Switch>
    </Router>
    </>
  )
}

export default App;
