Front-end:
1. Create a .env file in the root directory
2. Fill it with:
   PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID_HERE 
   VITE_API_BASE_URL=YOUR_BACKEND_URL
   VITE_PAYPAL_PLAN_ID=YOUR_SUBSCRIPTION_PLAN_ID
3. Run npm run build in the root of frontend/ directory
4. Copy the dist/ directory to backend/

Back-end:

1. Create a .env file in the root directory
2. Fill it with:
   PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID_HERE
   PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_CLIENT_SECRET_HERE
3. Install node
4. Run node server.js in the root of backend/ directory
