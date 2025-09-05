const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
connectDB();

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));

// Routes
app.use('/api/auth', require('./routes/auth'));
// Add other routes if needed:
// app.use('/api/products', require('./routes/products'));
// app.use('/api/orders', require('./routes/orders'));

// Serve HTML pages
app.get('/:page', (req, res) => {
  const filePath = path.join(__dirname, '../frontend', `${req.params.page}.html`);
  res.sendFile(filePath, err => {
    if (err) {
      console.error(`Error serving ${req.params.page}.html`, err);
      res.sendFile(path.join(__dirname, '../frontend/index.html'));
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
