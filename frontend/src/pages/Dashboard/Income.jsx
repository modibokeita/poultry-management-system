// Finance.jsx
import React, { useEffect, useState } from "react";

function Income() {
  const [finances, setFinances] = useState([]);

  const fetchFinances = async () => {
    const res = await fetch("http://localhost:8000/api/finance");
    const data = await res.json();
    setFinances(data);
  };

  useEffect(() => {
    fetchFinances();
  }, []);

  const income = finances
    .filter((f) => f.type === "income")
    .reduce((sum, f) => sum + f.amount, 0);
  const expense = finances
    .filter((f) => f.type === "expense")
    .reduce((sum, f) => sum + f.amount, 0);
  const incomeElements = finances.map(f => {
    if (f.type === 'income'){
      return (
        <table key={f.id} className="finance-income-table">
          <thead>
            <tr>
              <th>Income</th>
              <th>Date</th>
              <th>Montant (CFA)</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{f.id}</td>
              <td>{f.entry_date}</td>
              <td>{f.amount}</td>
              <td>{f.description}</td>
            </tr>
          </tbody>
        </table>

      )
      
    } 
  })
  const expenseElements = finances.map(f => {
    if (f.type === 'expense'){
      return (
        <table key={f.id} className="finance-income-table">
          <thead>
            <tr>
              <th>Expense</th>
              <th>Date</th>
              <th>Montant (CFA)</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{f.id}</td>
              <td>{f.entry_date}</td>
              <td>{f.amount}</td>
              <td>{f.description}</td>
            </tr>
          </tbody>
        </table>
      )

    } 
  })
  return (
    <div className="finance-container">
      <h2>Dépenses</h2>
      {expenseElements}
      <h3>Total de dépenses: {expense} CFA</h3>
      <h2>Revenus</h2>
      {incomeElements}
      <h3>Total de revenus: {income} CFA</h3>
    </div>
  );
}

export default Income;
