const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Define the advertisement offers
const advertisements = [
  {
    image: path.join(__dirname, 'public', 'images', 'coca-cola.jpg'),
    altText: 'Coca-Cola'
  },
  {
    image: path.join(__dirname, 'public', 'images', 'spinach.jpg'),
    altText: 'Spinach'
  },
  {
    image: path.join(__dirname, 'public', 'images', 'onion.jpg'),
    altText: 'Onion'
  },
  {
    image: path.join(__dirname, 'public', 'images', 'banana.jpg'),
    altText: 'Banana'
  },
  {
    image: path.join(__dirname, 'public', 'images', 'coconut.jpg'),
    altText: 'Coconut'
  }
];

// Set up static files middleware
app.use(express.static('public'));

// Define the route to render the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
