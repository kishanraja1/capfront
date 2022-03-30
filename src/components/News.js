import {useState, useEffect} from 'react'
import axios from 'axios'


const News = () => {

  let [news, setNews] = useState([1,2,3])

  const API_KEY = process.env.REACT_NEWS_KEY;



  // useEffect(() => {
  //   getNews()
  // })

  return (
    <>
    <h1>Today's News</h1>
    <div>
      {news.map((article) => {
        return (
          <div>
            <img src={article.urlToImage}/>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url}>Full story</a>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default News
