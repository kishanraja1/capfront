import {useState, useEffect} from 'react'

import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Add = (props) => {

  const [open, setOpen] = React.useState(false);
  let emptyStock = { headline:'', name:'', ticker:'', price:'', industry:'', opinion:''}
  const [stock, setStock] = useState(emptyStock)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleChange = (event) => {
    setStock({...stock, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(stock)
    console.log(stock);
  }

  //user inputs a ticker symbol on add form
  //we take ticker and find stock price in yahoo finance api
  //post it in the modal that opens for each stock
  return(
    <>
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add A Stock Opinion
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Stock Recommendation</DialogTitle>
        <Box component='form' onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please add stock details for your recommendation below:
          </DialogContentText>
          <TextField
            name='headline'
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="headline"
            type="text"
            value={stock.headline}
            fullWidth
            variant="standard"
          />
          <TextField
            name='name'
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="name"
            type="text"
            value={stock.name}
            variant="standard"
          />
          <TextField
            name='ticker'
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="ticker"
            type="text"
            value={stock.ticker}
            variant="standard"
          />
          <TextField
            name='price'
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="price"
            type="number"
            step='0.01'
            value={stock.price}
            variant="standard"
          />
          <TextField
            name='industry'
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="industry"
            type="text"
            value={stock.industry}
            fullWidth
            variant="standard"
          />
          <TextField
            name='opinion'
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="opinion"
            type="text"
            value={stock.opinion}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleClose} onSubmit={handleSubmit} type="submit">Post</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </div>
    </>
  )

}

export default Add


// <form onSubmit={handleSubmit}>
//   <label htmlFor="headline">Headline: </label>
//   <input type="text" name="headline" onChange={handleChange}/>
//   <br />
//   <label htmlFor="name">Company: </label>
//   <input type="text" name="name" onChange={handleChange}/>
//   <br />
//   <label htmlFor="ticker">Ticker Symbol: </label>
//   <input type="text" name="ticker" onChange={handleChange}/>
//   <br />
//   <label htmlFor="price">Stock Price: </label>
//   <input type="number" step="0.01" name="price" onChange={handleChange}/>
//   <br />
//   <label htmlFor="industry">Industry: </label>
//   <input type="text" name="industry" onChange={handleChange}/>
//   <br />
//   <label htmlFor="opinion">Your Opinion: </label>
//   <input type="text" name="opinion" onChange={handleChange}/>
//   <br />
//   <input type="submit"/>
// </form>
