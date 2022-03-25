import {useState, useEffect} from 'react'

const Add = (props) => {

  let emptyStock = { headline:'', name:'', ticker:'', price:'', industry:'', opinion:''}
  const [stock, setStock] = useState(emptyStock)


  const handleChange = (event) => {
    setStock({...stock, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(stock)
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="headline">Headline: </label>
        <input type="text" name="headline" onChange={handleChange}/>
        <br />
        <label htmlFor="name">Company: </label>
        <input type="text" name="name" onChange={handleChange}/>
        <br />
        <label htmlFor="ticker">Ticker Symbol: </label>
        <input type="text" name="ticker" onChange={handleChange}/>
        <br />
        <label htmlFor="price">Stock Price: </label>
        <input type="number" name="price" onChange={handleChange}/>
        <br />
        <label htmlFor="industry">Industry: </label>
        <input type="text" name="industry" onChange={handleChange}/>
        <br />
        <label htmlFor="opinion">Your Opinion: </label>
        <input type="text" name="opinion" onChange={handleChange}/>
        <br />
        <input type="submit"/>
      </form>
    </>
  )

}

export default Add
