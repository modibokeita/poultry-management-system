import React, { useEffect, useState } from "react";

function Mortality() {
  const [deaths, setDeaths] = useState("");
  const [records, setRecords] = useState([]);
  const [animalTypes, setAnimalTypes] = useState([]);
  const [dailyRecords, setDailyRecords] = useState([]);

  const [selectedAnimalType, setSelectedAnimalType] = useState("");
  const [selectedRecord, setSelectedRecord] = useState("");

  const fetchMortality = async () => {
    const res = await fetch("http://localhost:8000/api/animals");
    const data = await res.json();
    setRecords(data);
  };


  const fetchAnimalTypes = async () => {
    const res = await fetch("http://localhost:8000/api/animal-types");
    const data = await res.json();
    setAnimalTypes(data);
  };

  const fetchDailyRecords = async () => {
    const res = await fetch("http://localhost:8000/api/records");
    const data = await res.json();
    setDailyRecords(data);
  };

  const saveMortality = async () => {
    if (!selectedAnimalType || !selectedRecord) {
      alert("Please select an animal type and record date.");
      return;
    }
    if (deaths === "" || isNaN(deaths)) {
      alert("Please enter a valid number of deaths.");
      return;
    }

    await fetch("http://localhost:8000/api/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        daily_record_id: parseInt(selectedRecord, 10),
        animal_type_id: parseInt(selectedAnimalType, 10),
        alive: 0, // optional, can adjust later
        deaths: parseInt(deaths, 10),
      }),
    });

    setDeaths("");
    fetchMortality();
  };

  useEffect(() => {
    fetchMortality();
    fetchAnimalTypes();
    fetchDailyRecords();
  }, []);
  return (
    <div className="mortality-container">
      <h1>Mortality Records</h1>

      <div className="form-section">
        <h2>Add Mortality</h2>

        <label>
          Record Date:
          <select
            value={selectedRecord}
            onChange={(e) => setSelectedRecord(e.target.value)}
          >
            <option value="">-- Select record date --</option>
            {dailyRecords.map((rec) => (
              <option key={rec.id} value={rec.id}>
                {rec.record_date}
              </option>
            ))}
          </select>
        </label>

        <label>
          Animal Type:
          <select
            value={selectedAnimalType}
            onChange={(e) => setSelectedAnimalType(e.target.value)}
          >
            <option value="">-- Select animal type --</option>
            {animalTypes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Deaths Today:
          <input
            type="number"
            value={deaths}
            onChange={(e) => setDeaths(e.target.value)}
            placeholder="Enter number of deaths"
          />
        </label>

        <button onClick={saveMortality}>Record Mortality</button>
      </div>

      <h2>History</h2>
      <ul>
        {records.map((r, i) => (
          <li key={i}>
            {r.record_date} – {r.animal}: {r.deaths} deaths
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Mortality;
