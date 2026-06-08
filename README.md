# Mini Expense Tracker

A full-stack expense management application that helps users track daily expenses, analyze spending patterns, and view category-wise insights through interactive charts and summaries.

---

# Project Title & Brief Description

## Title

**Mini Expense Tracker**

## Description

This project tracks all your expenses and represents them in a useful format. The project fulfills requirements such as monthly budgets, category-wise expense tracking, and expense-to-income ratio analysis.

I chose this project to showcase my skills in API handling, React libraries, JavaScript, the Node.js environment, and my knowledge of various libraries used throughout the project.

---

# Live Demo

The application is deployed on Render.

## Frontend

https://mini-expense-tracker-frontend-exwe.onrender.com

## Backend

https://mini-expense-tracker-backend-npbc.onrender.com

---

# Features

* Add new expenses
* Update existing expenses
* Delete expenses
* View all expenses sorted by date
* Category-wise expense tracking
* Monthly spending summary
* Highest expense identification
* Interactive pie chart visualization
* CSV export functionality
* Responsive UI for desktop and mobile devices
* Backend API testing with Jest and Supertest

---

# Tech Stack

## Frontend

* React
* Vite
* Axios
* Tailwind CSS
* Recharts

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Testing

* Jest
* Supertest

## Deployment

* Render (Frontend)
* Render (Backend)

---

# Project Structure

```text
Mini-Expense-Tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryChart.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseItem.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── SummaryPanel.jsx
│   │   │
│   │   ├── services/
│   │   │   └── expenseService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── exportCSV.js
│   │   │   ├── formatCurrency.js
│   │   │   └── formatDate.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── __tests__/
│   │   │   └── expenses.test.js
│   │   │
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   └── expenseController.js
│   │   │
│   │   ├── models/
│   │   │   └── Expense.js
│   │   │
│   │   ├── routes/
│   │   │   └── expenseRoutes.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# How to Run Locally

## Prerequisites

* Node.js v18 or above
* MongoDB Atlas

---

## 1. Clone the Repository

```bash
git clone https://github.com/vid123ver/Mini-Expense-Tracker.git
cd Mini-Expense-Tracker
```

---

## 2. Start the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string_here
```

Start the backend server:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:8000
```

---

## 3. Start the Frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend application:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 4. Run Tests

```bash
cd backend
npm test
```

---

# API Documentation

## Base URL

```text
http://localhost:8000/api
```

---

## GET /api/expenses

### Description

Returns all expenses sorted by date (newest first).

### Success Response (200)

```json
[
  {
    "_id": "6a22707f78425dcea28e3c09",
    "amount": 100,
    "category": "Food",
    "date": "2026-06-05T00:00:00.000Z",
    "note": "Lunch",
    "createdAt": "2026-06-05T06:45:19.499Z"
  }
]
```

---

## POST /api/expenses

### Description

Creates a new expense.

### Request Body

```json
{
  "amount": 100,
  "category": "Food",
  "date": "2026-06-05",
  "note": "Lunch"
}
```

### Validation Rules

| Field    | Required | Rule                                         |
| -------- | -------- | -------------------------------------------- |
| amount   | Yes      | Must be greater than 0                       |
| category | Yes      | Food, Transport, Bills, Entertainment, Other |
| date     | Yes      | Cannot be a future date                      |
| note     | No       | Optional                                     |

### Success Response (201)

```json
{
  "_id": "6a22707f78425dcea28e3c09",
  "amount": 100,
  "category": "Food",
  "date": "2026-06-05T00:00:00.000Z",
  "note": "Lunch",
  "createdAt": "2026-06-05T06:45:19.499Z"
}
```

### Error Response (400)

```json
{
  "message": "Validation failed"
}
```

---

## PUT /api/expenses/:id

### Description

Updates an existing expense.

### Request Body

```json
{
  "amount": 150,
  "category": "Transport",
  "date": "2026-06-05",
  "note": "Taxi Fare"
}
```

### Success Response (200)

```json
{
  "_id": "6a22707f78425dcea28e3c09",
  "amount": 150,
  "category": "Transport",
  "date": "2026-06-05T00:00:00.000Z",
  "note": "Taxi Fare",
  "createdAt": "2026-06-05T06:45:19.499Z"
}
```

### Error Response (404)

```json
{
  "message": "Expense not found"
}
```

---

## DELETE /api/expenses/:id

### Description

Deletes an expense by ID.

### Success Response (200)

```json
{
  "message": "Expense deleted successfully"
}
```

### Error Response (404)

```json
{
  "message": "Expense not found"
}
```

---

## GET /api/expenses/summary

### Description

Returns spending summary for the current month.

### Success Response (200)

```json
{
  "totalThisMonth": 350,
  "perCategory": [
    {
      "_id": "Food",
      "total": 200
    },
    {
      "_id": "Transport",
      "total": 150
    }
  ],
  "highestExpense": {
    "_id": "6a22707f78425dcea28e3c09",
    "amount": 200,
    "category": "Food",
    "date": "2026-06-05T00:00:00.000Z"
  }
}
```

---

# Component Overview

## Frontend Components

### CategoryChart.jsx

Displays category-wise expense distribution using a pie chart.

### ExpenseForm.jsx

Handles adding and editing expenses with form validation.

### ExpenseItem.jsx

Represents a single expense item in the list.

### ExpenseList.jsx

Displays expenses in a table (desktop) or cards (mobile).

### FilterBar.jsx

Provides category and date-range filtering.

### SummaryPanel.jsx

Displays total spending, highest expense, and category statistics.

---

## Backend Components

### Expense.js

Mongoose schema and validation rules.

### expenseController.js

Contains all business logic for CRUD operations and summary generation.

### expenseRoutes.js

Defines API routes and maps them to controllers.

### db.js

Handles MongoDB Atlas connection.

### app.js

Configures Express middleware and application settings.

### server.js

Application entry point.

---

# Testing

Backend API testing is implemented using:

* Jest
* Supertest

Test files are located inside:

```text
backend/src/__tests__/
```

---

# What I Chose Not to Do

## Budget Settings per Category

This feature was intentionally excluded from the current scope.

## Frontend Unit Testing

Testing is focused on backend logic and APIs. Frontend testing was excluded from the current scope.

---

# Future Enhancement

## From Manual Expense Entry to 90% Automated Expense Tracking

As a future enhancement, I plan to integrate an automated expense-tracking feature using an Android SMS Forwarder application.

By utilizing a secure system key, the application can automatically read and process bank transaction SMS messages, extract relevant expense details, and add them directly to the expense tracker. This would automate nearly 90% of the expense recording process and significantly reduce manual effort.

I have already developed a basic version of the Android SMS Forwarder application, and its core functionality is working successfully. The application can receive and forward transaction messages as intended.

However, the project is still under development, and additional features such as advanced categorization, enhanced security, and seamless integration with the expense tracker are currently being implemented.

---

# Author

**Vidhan Verma**

B.Tech CSE Student

Mini Expense Tracker Project
