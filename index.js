// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const logger = require('./logger');
const rateLimit = require('express-rate-limit');
const cors = require('cors'); // Add CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware (add body parser if needed in the future)
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files from the public directory
app.use(express.static('public'));

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// API routes
app.use('/api', require('./routes/contacts'));

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server with error handling
app.listen(PORT, (err) => {
  if (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});