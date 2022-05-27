require('dotenv').config();

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const expressLayouts = require('express-ejs-layouts')

// require spotify-web-api-node package here:

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));
// Our routes go here:
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/search', (req, res) => {
    const artist = req.query.artist
    res.render('search', {artist})
})

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
