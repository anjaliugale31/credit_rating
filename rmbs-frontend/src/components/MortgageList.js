import React, { useEffect, useState } from "react";
import { fetchMortgages, deleteMortgage } from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';

const MortgageList = ({ refreshTrigger }) => {
  const [mortgages, setMortgages] = useState([]);

  useEffect(() => {
    fetchMortgages()
      .then((res) => setMortgages(res.data))
      .catch((err) => console.error("Error fetching mortgages:", err));
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      await deleteMortgage(id);
      setMortgages(mortgages.filter((mortgage) => mortgage.id !== id));
    } catch (error) {
      console.error("Error deleting mortgage:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Mortgage List</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Credit Score</th>
              <th>Loan Amount</th>
              <th>Property Value</th>
              <th>Annual Income</th>
              <th>Debt Amount</th>
              <th>Loan Type</th>
              <th>Property Type</th>
              <th>Credit Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mortgages.map((mortgage) => (
              <tr key={mortgage.id}>
                <td>{mortgage.id}</td>
                <td>{mortgage.credit_score}</td>
                <td>${mortgage.loan_amount.toFixed(2)}</td>
                <td>${mortgage.property_value.toFixed(2)}</td>
                <td>${mortgage.annual_income.toFixed(2)}</td>
                <td>${mortgage.debt_amount.toFixed(2)}</td>
                <td>{mortgage.loan_type}</td>
                <td>{mortgage.property_type}</td>
                <td>{mortgage.credit_rating}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(mortgage.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {mortgages.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center text-muted">
                  No mortgage records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MortgageList;
