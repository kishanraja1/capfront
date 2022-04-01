import {useState} from 'react'

// MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//MUI Icons
import EditIcon from '@mui/icons-material/Edit';


const Edit = (props) => {

  let emptyStock = { id: props.id, headline:'', name:'', ticker:'', price:'', industry:'', opinion:''}

  const [stock, setStock] = useState(emptyStock)
  const [open, setOpen] = useState(false);

  /////// DIALOG FUNC \\\\\\\
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);


  const handleChange = (e) => {
    setStock({...stock, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleUpdate(stock)
    handleClose()
  }



  return (
    <>
    <div className="edit-album">
  <EditIcon onClick={handleOpen}/>
  <Dialog
    open={open}
    onClose={handleClose}
  >
    <DialogTitle variant="h5">Edit Stock Opinion</DialogTitle>
    <DialogContent>
      <Box component="form" onSubmit={(event) => {handleSubmit(event, stock)}}>
        <TextField
          name="headline" value={stock.headline}
          onChange={handleChange}
          variant="outlined" label = "Headline"
          sx={{ m: 1 , color:'#19196E'}}/>
        <TextField
          name="name"
          value={stock.name} onChange={handleChange}
          variant="outlined" label = "Company"
          sx={{ m: 1, color:'#19196E'}}/>
        <TextField
          name="ticker" value={stock.ticker}
          onChange={handleChange}
          variant="outlined" label="Ticker Symbol"
            sx={{ m: 1, color:'#19196E'}}/>
        <TextField
          type="number" name="price" value={stock.price}
          onChange={handleChange}
          variant="outlined" label="Stock Price"
          sx={{ m: 1, color:'#19196E'}}/>
        <TextField
          name="industry" value={stock.industry}
          onChange={handleChange}
          variant="outlined" label="Industry"
          sx={{ m: 1, color:'#19196E'}}/>
        <TextField
          name="opinion" value={stock.opinion}
          onChange={handleChange}
          variant="outlined" label="Opinion"
          sx={{ m: 1, color:'#19196E'}}/>
        <Button>
          <input type="submit"/>
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
</div>

    </>
  )

}

export default Edit


// <details>
//   <summary>Edit Stock</summary>
//   <form onSubmit={handleSubmit}>
//   <label htmlFor="headline">Headline: </label>
//   <input
//     type="text"
//     name="headline"
//     value={stock.headline}
//     onChange={handleChange}
//   />
//   <br />
//   <label htmlFor="name">Name: </label>
//   <input
//     type="text"
//     name="name"
//     value={stock.name}
//     onChange={handleChange}
//   />
//   <br />
//   <label htmlFor="ticker">Ticker Symbol: </label>
//   <input
//     type="text"
//     name="ticker"
//     value={stock.ticker}
//     onChange={handleChange}
//   />
//   <br />
//   <label htmlFor="price">Price: </label>
//   <input
//     type="number"
//     name="price"
//     value={stock.price}
//     onChange={handleChange}
//   />
//   <br />
//   <label htmlFor="industry">Industry: </label>
//   <input
//     type="text"
//     name="industry"
//     value={stock.industry}
//     onChange={handleChange}
//   />
//   <br />
//   <label htmlFor="opinion">Opinion: </label>
//   <input
//     type="text"
//     name="opinion"
//     value={stock.opinion}
//     onChange={handleChange}
//   />
//   <input type="submit" />
//   </form>
// </details>
