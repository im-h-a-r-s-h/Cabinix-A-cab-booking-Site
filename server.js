const express = require('express'); // Import Express framework
const bodyParser = require('body-parser'); // Import body-parser middleware for parsing request bodies
const fs = require('fs'); // Import file system module for file operations
const path = require('path'); // Import path module for working with file paths

const app = express(); // Create an instance of Express
const port = 3000; // Define the port for the server

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public')); // This line may be redundant

// Define routes for serving HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Send the index.html on root request
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'booking.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacts.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gallery.html'));
});

// Serve static assets (images, JS, CSS)
app.get('/assets/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', req.params.filename));
});

// Serve JS files
app.get('/js/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, 'js', req.params.filename));
});

// Serve CSS files
app.get('/css/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'CSS', req.params.filename));
});

// Handle form submission
app.post('/submitForm', (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2) + '\n';

  fs.appendFile('data.json', jsonData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data stored successfully:', jsonData);
      res.redirect('/signup.html'); // Redirect after form submission
    }
  });
});

// Handle booking submission
app.post('/submitBooking', (req, res) => {
  const bookingData = req.body;
  const jsonData = JSON.stringify(bookingData, null, 2) + '\n';

  fs.appendFile('bookingdata.json', jsonData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('THANK YOU - FOR BOOKING OUR TAXI 😀:', jsonData);
      res.status(200).send('THANK YOU - FOR BOOKING OUR TAXI 😀:');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
