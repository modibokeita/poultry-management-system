import React, { useEffect, useState } from "react";

function Eggs() {
  const [quantity, setQuantity] = useState("");
  const [records, setRecords] = useState([]);

  const fetchEggs = async () => {
    try {
      
      const res = await fetch("http://localhost:8000/api/eggs");
      const data = await res.json();
      setRecords(data)

    } catch (error) {
      console.log(error)
    }
  };

  const saveEggs = async () => {

    await fetch("http://localhost:8000/api/eggs", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        record_date: new Date().toISOString().split("T")[0],
        quantity: parseInt(quantity, 10),
        user_id: 1
      }),
    });
    setQuantity("");
    fetchEggs();
  };

  useEffect(() => {
    fetchEggs();
  }, []);

  return (
    <div className="eggs-container">
      <h1>Enregistrement des Oeufs</h1>
      <div className="eggs-input">
        <h2>Œufs collectés aujourd'hui</h2>
  

        <input
        className="input"
          type="number"
          placeholder="Enter number"
          value={quantity}
          required
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button
          onClick={saveEggs}
           className="eggs-saveBtn">
          Save
          
        </button>
 
      </div>

      <h2>History</h2>
      <ul>
        {records.map((r) => (
          <li key={r.id}>
            {r.record_date}: {r.quantity} Oeufs
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Eggs;
