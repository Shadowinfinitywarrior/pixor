# Pixor Chicken Feed Selling Platform

## Setup Instructions
1. **Install MongoDB**
   - Ensure MongoDB is running locally (`mongod`) or use MongoDB Atlas.
   - Update `MONGO_URI` in `backend/.env` if using Atlas.

2. **Backend Setup**
   - Navigate to `backend`: `cd backend`
   - Install dependencies: `npm install`
   - Create `backend/.env` with:
     ```
     MONGO_URI=mongodb://localhost:27017/pixor
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
   - Start the server: `npm start`

3. **Access the Application**
   - Open `http://localhost:5000` to load `index.html`.
   - Navigate to `/login`, `/register`, `/products`, etc.

4. **Features**
   - User authentication with JWT (default role: user).
   - User dashboard for orders, admin dashboard for product/order management.
   - Product listing, cart, and order placement.
   - Pages: Home, About Us, Our Business, Enriching Lives, Suppliers, Careers, Contact Us.
   - Footer with social media links and contact number.

5. **Troubleshooting**
   - **Navigation Issues**: Ensure `server.js` serves correct HTML files.
   - **Login/Register/Products Issues**: Check browser console (F12) and server logs.
   - **MongoDB**: Verify `MONGO_URI` and MongoDB service.

6. **Notes**
   - Replace social media URLs in footer with actual profiles.
   - Payment placeholder in `order.js` needs a gateway like Stripe.
   - Contact form is a placeholder; add a backend route if needed.# pixor
