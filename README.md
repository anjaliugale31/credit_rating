# RMBS Credit Rating App

This is a full-stack web application for calculating and managing residential mortgage-backed securities (RMBS) credit ratings. It consists of a React frontend and Django backend with a MySQL database.

---

## ✨ Features

- Add new mortgage applications via a user-friendly form
- Automatically calculate credit rating (AAA, BBB, C) based on mortgage attributes
- View a list of all mortgages with computed credit ratings
- Delete individual mortgage records
- Form validation with React Hook Form + Yup
- REST API built with Django REST Framework

---

## ⚙️ Tech Stack

- **Frontend**: React, Bootstrap, React Hook Form, Yup
- **Backend**: Django, Django REST Framework
- **Database**: Sqlite3
- **Styling**:  Bootstrap

---

## 🚀 Getting Started

### 📦 Backend Setup (Django)

```bash
cd rmbs_project/
python -m venv env
source env/bin/activate 
pip install -r requirements.txt
python manage.py runserver
```

---

### 💻 Frontend Setup (React)

```bash
cd rmbs-frontend/
npm install  # creates node_modules folder
npm start
```

Make sure the backend is running at `http://localhost:8000` or update your `api.js` file with the correct API base URL.

> **Note:** You must run `npm install` to create the `node_modules` directory before starting the React development server.

---

## 🧪 Testing

### Unit Tests (Django Backend)

Run test cases for:
- Valid/invalid mortgage inputs
- Edge cases: e.g. negative values, bad credit scores
- Correct credit rating calculation

```bash
python manage.py test
```

---

## 🔐 Design Decisions

- **Credit Rating Logic**: Implemented in the `calculate_credit_rating` method on the `Mortgage` model, based on:
  - Credit score
  - Loan-to-value (LTV) ratio
  - Debt-to-income (DTI) ratio
- **Validation**: Client-side validation is done via Yup schema in the React form; server-side validation is handled by Django serializers.

---

## 📅 API Endpoints

- `GET http://127.0.0.1:8000/api/mortgages/` – Get list of all mortgages
- `POST http://127.0.0.1:8000/api/mortgages/` – Add new mortgage (calculates credit rating)
- `DELETE http://127.0.0.1:8000/api/mortgages/<id>/` – Delete a mortgage

---

## 📓 Example Mortgage Payload

```json
{
  "credit_score": 720,
  "loan_amount": 250000,
  "property_value": 300000,
  "annual_income": 90000,
  "debt_amount": 20000,
  "loan_type": "fixed",
  "property_type": "single_family"
}
```


