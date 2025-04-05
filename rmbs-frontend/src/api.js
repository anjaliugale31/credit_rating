// import axios from "axios";

// const API_BASE_URL = "http://127.0.0.1:8000/api";

// export const fetchMortgages = () => axios.get(`${API_BASE_URL}/mortgages/`);
// export const addMortgage = (data) => axios.post(`${API_BASE_URL}/mortgages/`, data);
// export const deleteMortgage = (id) => axios.delete(`${API_BASE_URL}/mortgages/${id}`);


// src/api.js
// src/api.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"

// Create mortgage (POST)
export const addMortgage = (data) => {
  return axios.post(`${BASE_URL}/mortgages/`, data);
};

// Get all mortgages (GET)
export const fetchMortgages = () => {
  return axios.get(`${BASE_URL}/mortgages/`);
};

// Delete a mortgage by ID (DELETE)
export const deleteMortgage = (id) => {
  return axios.delete(`${BASE_URL}/mortgages/${id}/`);
};

