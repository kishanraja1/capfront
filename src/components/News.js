import {useState, useEffect} from 'react'
import axios from 'axios'


const News = (props) => {

  let [news, setNews] = useState([1,2,3])

  const API_KEY = process.env.REACT_APP_NEWS_KEY;

  const getNews= (symbol) => {
    let options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + API_KEY,
    params: {modules: 'defaultKeyStatistics'},

  }

  axios.request(options).then(function (response) {
    setNews(response.data.articles)
  }).catch(function (error) {
    console.error(error);
  });

  }

  useEffect(() => {
    getNews()
  })


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
