# Contact API

A backend RESTful API for managing contact form submissions, built by Manthan Ankolekar using Node.js, Express, and MongoDB. This project provides endpoints for submitting, retrieving, and deleting contacts, with features such as input validation, rate limiting, logging, email notifications, and interactive API documentation via Swagger. The API is designed to be used with a static HTML/CSS/JS frontend (see [Live Frontend Demo](https://manthanank.github.io/contact/)), but this repository contains only the backend/API code.

## Project Overview

- **Frontend:** Static HTML, CSS, and JavaScript for the contact form UI and contacts table (with pagination and delete functionality).
- **Backend:** Node.js, Express, and MongoDB provide a RESTful API for submitting, retrieving, and deleting contacts. Includes validation, rate limiting, logging, and Swagger API docs.

## Project Structure

- **public/**
  - `index.html`: Main contact form page (frontend)
  - `style.css`: CSS for frontend page
  - `script.js`: JavaScript for frontend page
  - `assets/`: Favicons and images
- **index.js**: Express app entry point
- **config/db.js**: MongoDB connection logic
- **config/swagger.js**: Swagger API documentation setup
- **controllers/contactsController.js**: Contact API logic
- **models/contacts.js**: Mongoose schema/model for contacts
- **routes/contacts.js**: API route definitions
- **middleware/validateContact.js**: Request validation middleware
- **utils/errorResponse.js**: Error response utility
- **utils/mailer.js**: Email sending utility
- **logger.js**: Winston logger (console, file, MongoDB)
- **README.md**: Project documentation

## How to Run

### Backend (API server)

1. Clone the repository:

   ```bash
   git clone https://github.com/manthanank/contact-api.git
   cd contact
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up a `.env` file with your MongoDB URI and SMTP credentials:

   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_uri
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SERVICE=gmail
   SMTP_MAIL=your_email@example.com
   SMTP_APP_PASS=your_email_password
   ```

   - SMTP credentials are required for email notifications when a contact form is submitted.

4. Start the server:

   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

5. API will be available at `http://localhost:3000/api/contacts`
6. Swagger API docs: `http://localhost:3000/api-docs`

### Frontend (Static site)

- Open `public/index.html` in your browser for the contact form and contacts table view.
- The frontend automatically switches API endpoints for local/production environments.

## API Endpoints

- `POST /api/contacts` — Submit a new contact (JSON: name, email, message)
- `GET /api/contacts` — Get all contacts (paginated, query param: `page`)
- `GET /api/contacts/:id` — Get a contact by ID
- `DELETE /api/contacts/:id` — Delete a contact by ID
- `POST /api/contact` — (Legacy) Submit a new contact (for backward compatibility)

## Features

- **Validation:** All contact fields required; email format checked (middleware)
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **Logging:** Console, file (dev), and MongoDB (prod, collection: `logs`) logging with Winston
- **Email Notification:** Sends an email to the site owner on new contact form submission (requires SMTP env vars)
- **Swagger Docs:** Interactive API documentation at `/api-docs`
- **Error Handling:** Consistent error responses
- **Responsive Design:** Frontend adapts to all screen sizes
- **Dynamic Favicon:** Changes with color scheme
- **API Endpoint Switching:** Frontend JS chooses API endpoint based on environment

## Contact

For any inquiries or feedback, contact Manthan Ankolekar:

- **Email:** [manthan.ank46@gmail.com](mailto:manthan.ank46@gmail.com)

## License

This project is licensed under the [MIT License](LICENSE).

---

&copy; 2025 Manthan Ankolekar | Contact Form.
