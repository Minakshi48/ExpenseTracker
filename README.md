Sure! I've prepared a Word-format-ready version of the README for your Expense Tracker application. You can copy this into Microsoft Word and save it as `.docx`.

---

# Expense Tracker Application

A web application to track income and expenses, with filters, summary, and visual charts. Built with **React**, **Redux Toolkit**, **Material-UI / Bootstrap**, **Node.js**, **Express**, and **MongoDB**.

---

## Features

* Add income and expense transactions with **category, description, amount, and date**
* View all transactions in a **table**
* Filter transactions by **type, category, and date**
* Pie chart visualization of **expenses vs remaining income**
* Summary cards for **total income, expense, and balance**
* Dark/light mode support
* Validations: prevent adding expense exceeding available balance

---

## Tech Stack

* **Frontend:** React, Redux Toolkit, React-Bootstrap, Material-UI, Recharts
* **Backend:** Node.js, Express, MongoDB
* **State Management / API Calls:** Redux Toolkit Query

---

## Folder Structure

```
expense-tracker/
├─ backend/
│  ├─ models/
│  │─ middleware/
│  ├─ routes/
│  ├─ server.js
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ api/
│  │  ├─ context/
│  │  ├─ App.jsx
│  │  └─ index.jsx
│  └─ package.json
└─ README.docx
```

---

## Prerequisites

* Node.js >= 18
* npm >= 9
* MongoDB (local or Atlas)

---

## Backend Setup

1. Open terminal and navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your MongoDB connection string:

```
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
```

4. Start the backend server:

```bash
npm run dev
```

* Server runs on `http://localhost:5000`
* API endpoints:

```
GET /api/transactions          - Get all transactions
POST /api/transactions         - Add new transaction
DELETE /api/transactions/:id   - Delete transaction
```

---

## Frontend Setup

1. Open a new terminal and navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

* Frontend runs on `http://localhost:5173` (or the port shown in terminal)
* Connects to backend API for transactions

---

## Usage

1. Open the frontend in your browser.
2. Add new income or expense transactions using the **form**.
3. Filter transactions using **Apply** or **Reset**.
4. Pie chart shows **remaining income vs expenses**.
5. **Insufficient Balance** alert appears if expense > available balance.
6. Dark mode switches UI colors for all components.

---

## Notes

* Reset button clears all filters without sending empty values to backend.
* Summary cards always show total income, total expense, and available balance, independent of filters.
* Pie chart slices only show **tooltip on hover**, no persistent highlight.

---

## Dependencies

**Backend:**

* express
* mongoose
* cors
* dotenv
* nodemon

**Frontend:**

* react
* react-dom
* redux / @reduxjs/toolkit
* react-redux
* @mui/material / @mui/icons-material / @emotion/react / @emotion/styled
* recharts
* react-bootstrap / bootstrap
* axios

---

## Scripts

**Backend:**

```bash
npm run dev       # Start server in development mode
npm start         # Start server in production mode
```

**Frontend:**

```bash
npm run dev       # Start Vite dev server
npm run build     # Build production bundle
```

---

This README provides full instructions to **set up and run the Expense Tracker application locally**.
