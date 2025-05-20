Front-end:

1. Create a text file named .env in the root of frontend directory with any text editor
2. Fill it with:
   PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID_HERE 
   VITE_API_BASE_URL=YOUR_BACKEND_URL
   VITE_PAYPAL_PLAN_ID=YOUR_SUBSCRIPTION_PLAN_ID
3. Install node with npm (https://nodejs.org/en/download)
4. Open terminal in the root of frontend/ directory and run "npm run build"
5. Copy the dist/ directory to backend/

Back-end:

1. Create a text file named .env in the root of backend directory with any text editor
2. Fill it with:
   PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID_HERE
   PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_CLIENT_SECRET_HERE
3. Open terminal in the root of backend/ directory and run "node server.js"
