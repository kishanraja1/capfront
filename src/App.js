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
  const [index, setIndex] = useState([])
  const [query, setQuery] = useState('')


  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
    console.log(editStock.id)
    console.log('https://salty-oasis-93120.herokuapp.com/api/stocks/' + editStock.id)
    axios
    .put('https://salty-oasis-93120.herokuapp.com/api/stocks/' + editStock.id, editStock)
      .then((response) => {
        getStocks()
      })
  }

  const handleSearch = (e) => {
    let lowerCaseSearch = e.target.value.toLowerCase()
    setQuery(lowerCaseSearch)
    console.log(query)
  }



  const stocksMap = stocks.map((stock) => {
  if (stock.name.toLowerCase().includes(query)) {

  return(
  <div className="stocks" key={stock.id}>
  <div>
<Button onClick={handleOpen}>{stock.headline}</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
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
  </Box>
</Modal>
</div>
          <Edit handleUpdate={handleUpdate} stock={stock} id={stock.id}/>
          <button onClick={handleDelete} value={stock.id}>X</button>
    </div>
  )}
})

  useEffect(() => {
    getStocks();
    // getIndexData()
  },[])


  return (
    <>
    <h1>SeekingBeta</h1>
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
