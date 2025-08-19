import React, { useState } from "react";

function Finance() {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const saveFinances = async () => {
    if (!amount) return alert("Please enter an amount");

    try {
      await fetch("http://localhost:8000/api/finance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entry_date: new Date().toISOString().split("T")[0],
          type,
          amount: parseFloat(amount),
          description,
          user_id: 1,
        }),
      });

      setAmount("");
      setDescription("");
      setType("income");
    } catch (error) {
      console.log("Error saving finance record:", error);
    }
  };

  return (
    <div className="finance-container">
      <h1>Add New Finance Record</h1>

      <div className="finance-form">
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Amount:
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button onClick={saveFinances}>Save</button>
      </div>
    </div>
  );
}

export default Finance;
