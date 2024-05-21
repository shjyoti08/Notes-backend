// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost/notesapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
    // Start server after successful MongoDB connection
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    // Exit application if MongoDB connection fails
    process.exit(1);
  });
  
// Routes
const notesRoutes = require('./routes/notes');
app.use('/api/notes', notesRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
