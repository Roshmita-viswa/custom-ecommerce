# Custom E-Commerce Demo

A learning project using React + Vite, Node.js + Express, and MongoDB. Includes product search/filter, product cards, cart, and a demo checkout endpoint (no real payment processing).

## Requirements
Install Node.js LTS and MongoDB Community Server, or create a MongoDB Atlas database.

## Start the backend
```bash
cd backend
npm install
```
Copy `.env.example` to `.env`, then edit `MONGODB_URI` if needed.
- Windows PowerShell: `Copy-Item .env.example .env`
- macOS/Linux: `cp .env.example .env`

With MongoDB running:
```bash
npm run seed
npm run dev
```
API: http://localhost:5000/api/products

## Start the frontend
Open a second terminal:
```bash
cd frontend
npm install
```
Copy `frontend/.env.example` to `frontend/.env`, then:
```bash
npm run dev
```
Open http://localhost:5173

## Push to GitHub
Create an empty repository on GitHub, then run these commands from the project root:
```bash
git init
git add .
git commit -m "Initial custom e-commerce project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/custom-ecommerce.git
git push -u origin main
```
Replace the URL with your actual repository URL. `.env` files are ignored; never commit secrets.

## Notes
- Checkout is a demo only; no payments are processed.
- Product images are loaded from remote image URLs, so internet access is needed for them.
- Customize and test the code before presenting it as your own work. Only report features you actually built and understand.
