import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Add from './components/Add'
import Edit from './components/Edit'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'

const App = () => {

  let [stocks, setStocks] = useState([])
  let [index, setIndex] = useState([])
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
    params: {modules: 'defaultKeyStatistics'},
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
    console.log(response.data.quoteResponse.result.displayName)
  }).catch(function (error) {
    console.error(error);
  });

  }


///////////// SEARCH BAR ///////////////////////
  const handleSearch = (e) => {
    let lowerCaseSearch = e.target.value.toLowerCase()
    setQuery(lowerCaseSearch)
  }

  const stocksMap = stocks.map((stock) => {
  if (stock.name.toLowerCase().includes(query)) {

  return(
  <div className="stocks" key={stock.id}>
  <div>
  <div className="postContainer">
    <Button onClick={handleOpen}>{stock.headline}</Button>
    <p>{stock.name}</p>
    <Edit handleUpdate={handleUpdate} stock={stock} id={stock.id}/>
    <button onClick={handleDelete} value={stock.id}>X</button>
  </div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
    <Box className="stockBox">
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {stock.headline}
        </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {stock.name}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {stock.ticker}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {stock.price}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {stock.industry}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {stock.opinion}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {getStockData(stock.ticker)}
      </Typography>
    </Box>
    </Modal>
    </div>
    </div>
  )}
})

  useEffect(() => {
    getStocks();
    getIndexData()
  },[])


  return (
    <>
    <h1>SeekingBeta</h1>
    <div className = "stockIndex">
      {index.map((i) => {
        return(
          <div className="singleIndex" key={i.index}>
            <h4>{i.shortName}: {i.regularMarketPrice.fmt}</h4>
          </div>
        )
      })}
    </div>
    <h2>Stock Market Data</h2>
    <TextField
    id='outlined-basic'
    variant='outlined'
    fullWidth
    label='Search'
    onChange = {handleSearch}
    />
    <Add handleCreate={handleCreate}/>
    <div className='stockContainer'>
      {stocksMap}
    </div>
    </>
  )
}

export default App;
