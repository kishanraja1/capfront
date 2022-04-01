import {useState, useEffect} from 'react'
import axios from 'axios'


const News = (props) => {

  let [news, setNews] = useState([
    {url: 'https://www.reuters.com/world/china/eu-push-china-summit-not-help-russia-ukraine-war-2022-03-31/',
    title: 'Russias ally China tells EU it will pursue Ukraine peace in its own way',
    urlToImage:'https://www.reuters.com/resizer/3D5gCwjJyMlJMdf_Yg_ytxC3h9M=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/QSMQH5HR5BM5DNOZZDM7DJW4XU.jpg',
    description: 'China offered the European Union assurances on Friday that it would seek peace in Ukraine but said this would be on its own terms, deflecting pressure for a tougher stance towards Russia.'},
    {url: 'https://www.nbcnews.com/news/us-news/two-florida-students-hit-car-waiting-school-bus-die-injuries-officials-rcna22403',
    title: 'Two Florida students hit by car while waiting for school bus die of their injuries, officials say',
    urlToImage:'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/rockcms/2022-03/220322-Royal-Palm-Beach-accident--683221.jpg',
    description: 'The victims were Tiana Johnson and Chand Wazir, both 15, the Palm Beach County Sheriffs Office said.”'},
    {url: 'https://www.thedailybeast.com/inside-ginni-thomas-insane-hiring-memos-for-former-president-donald-trump',
    title: 'Inside Ginni Thomas’ ‘Insane’ Hiring Memos for Trump',
    urlToImage:'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_675,w_1200,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1648776296/220331-ginnia-thomas-trump-hero_icsgyd',
    description: 'Ginni Thomas’ suggested hires included known bigots and at least one suspected foreign spy, sources say.'}])

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
    // getNews()
  })


  return (
    <>
    <h1>Today's News</h1>
    <div className = 'newsDiv'>
      {news.map((article) => {
        return (
          <div key={article.url}>
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
