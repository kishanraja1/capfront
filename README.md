# SeekingBeta

This full-stack project is a site for users to perform market research in order to make investing decisions. Below are relevent links to this project:
1. Front end live link: https://fierce-retreat-92206.herokuapp.com/
2. Back end live link: https://salty-oasis-93120.herokuapp.com/api/stocks
3. Back end repo: https://github.com/kishanraja1/capstone-back


## Technologies Used

The technologies used on the front end are:
### React
### Material UI
### Yahoo Finance API
### Axios
### React Router

## Approach Taken
After setting up the backend, the steps taken to complete the front end were:
1. Use create-react-app for initial project setup.
2. Use axios to make CRUD requests to the API that I built.
3. Identify and write code to make data requests to Yahoo Finance and NewsAPI.org
4. Style with Material UI.
5. Use react router for information organization.

## Unsolved Problems

Yahoo Finance API's free tier was used. As a result, this site can only make 100 requests per day before receiving a 429 error. It is necessary to research other API's that have the same vast data, but do not limit free tiers, or to make a payment to yahoo if this site will scale. Additionally, Google's newsapi.org does not allow API requests from the front end.

## Notes to Self

Make API calls from the backend for newsapi.org to work properly on the live site. It will work on Localhost, but the request will not be fulfilled from Heroku.
