import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addMortgage } from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';

const schema = yup.object().shape({
  credit_score: yup.number().min(300).max(850).required(),
  loan_amount: yup.number().positive().required(),
  property_value: yup.number().positive().required(),
  annual_income: yup.number().positive().required(),
  debt_amount: yup.number().positive().required(),
  loan_type: yup.string().oneOf(["fixed", "adjustable"]).required(),
  property_type: yup.string().oneOf(["single_family", "condo"]).required(),
});

const MortgageForm = ({ onMortgageAdded }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await addMortgage(data);
      onMortgageAdded();
      reset();
      alert(`Credit Rating: ${response.data.credit_rating}`);
    } catch (error) {
      console.error("Error adding mortgage:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Add Mortgage</h2>

        <div className="mb-3">
          <input {...register("credit_score")} className="form-control" placeholder="Credit Score" />
          <div className="text-danger small">{errors.credit_score?.message}</div>
        </div>

        <div className="mb-3">
          <input {...register("loan_amount")} className="form-control" placeholder="Loan Amount" />
          <div className="text-danger small">{errors.loan_amount?.message}</div>
        </div>

        <div className="mb-3">
          <input {...register("property_value")} className="form-control" placeholder="Property Value" />
          <div className="text-danger small">{errors.property_value?.message}</div>
        </div>

        <div className="mb-3">
          <input {...register("annual_income")} className="form-control" placeholder="Annual Income" />
          <div className="text-danger small">{errors.annual_income?.message}</div>
        </div>

        <div className="mb-3">
          <input {...register("debt_amount")} className="form-control" placeholder="Debt Amount" />
          <div className="text-danger small">{errors.debt_amount?.message}</div>
        </div>

        <div className="mb-3">
          <select {...register("loan_type")} className="form-select">
            <option value="">Select Loan Type</option>
            <option value="fixed">Fixed</option>
            <option value="adjustable">Adjustable</option>
          </select>
          <div className="text-danger small">{errors.loan_type?.message}</div>
        </div>

        <div className="mb-4">
          <select {...register("property_type")} className="form-select">
            <option value="">Select Property Type</option>
            <option value="single_family">Single Family</option>
            <option value="condo">Condo</option>
          </select>
          <div className="text-danger small">{errors.property_type?.message}</div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Mortgage
        </button>
      </form>
    </div>
  );
};

export default MortgageForm;
