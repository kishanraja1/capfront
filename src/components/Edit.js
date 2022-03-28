import {useState} from 'react'


const Edit = (props) => {

  let emptyStock = { id: props.id, headline:'', name:'', ticker:'', price:'', industry:'', opinion:''}
  const [stock, setStock] = useState(emptyStock)


  const handleChange = (e) => {
    setStock({...stock, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(stock.name)
    props.handleUpdate(stock)
  }



  return (
    <>
      <details>
        <summary>Edit Stock</summary>
        <form onSubmit={handleSubmit}>
        <label htmlFor="headline">Headline: </label>
        <input
          type="text"
          name="headline"
          value={stock.headline}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={stock.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="ticker">Ticker Symbol: </label>
        <input
          type="text"
          name="ticker"
          value={stock.ticker}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          name="price"
          value={stock.price}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="industry">Industry: </label>
        <input
          type="text"
          name="industry"
          value={stock.industry}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="opinion">Opinion: </label>
        <input
          type="text"
          name="opinion"
          value={stock.opinion}
          onChange={handleChange}
        />
        <input type="submit" />
        </form>
      </details>
    </>
  )

}

export default Edit
