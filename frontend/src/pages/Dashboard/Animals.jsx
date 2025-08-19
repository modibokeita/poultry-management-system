import React, { useEffect, useState } from "react";

function Animals() {
  const [animalType, setAnimalType] = useState("");
  const [alive, setAlive] = useState("");
  const [deaths, setDeaths] = useState("");

  const [animalTypes, setAnimalTypes] = useState([]);
  const [dailyRecords, setDailyRecords] = useState([]);

  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [selectedRecordId, setSelectedRecordId] = useState("");

//   Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      const resTypes = await fetch("http://localhost:8000/api/animal-types");
      const typesData = await resTypes.json();
      setAnimalTypes(typesData);

      const resRecords = await fetch("http://localhost:8000/api/records");
      const recordsData = await resRecords.json();
      setDailyRecords(recordsData);
    };

    fetchData();
  }, []);

  // Save new animal type
  const saveAnimalType = async () => {
    if (!animalType.trim()) {
      alert("Please enter an animal type.");
      return;
    }

    await fetch("http://localhost:8000/api/animal-types", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: animalType }),
    });

    setAnimalType("");
    alert("Animal type saved ✅");

    // Refresh dropdown
    const resTypes = await fetch("http://localhost:8000/api/animal-types");
    setAnimalTypes(await resTypes.json());
  };

  // Save daily animal record
  const saveAnimalRecord = async () => {
    if (!selectedRecordId || !selectedTypeId || alive === "" || deaths === "") {
      alert("Please fill in all fields.");
      return;
    }

    await fetch("http://localhost:8000/api/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        daily_record_id: parseInt(selectedRecordId, 10),
        animal_type_id: parseInt(selectedTypeId, 10),
        alive: parseInt(alive, 10),
        deaths: parseInt(deaths, 10),
      }),
    });

    setAlive("");
    setDeaths("");
    setSelectedRecordId("");
    setSelectedTypeId("");

    alert("Daily animal record saved ✅");
  };

  return (
    <div className="animals-container">
      <h1>Animals Records</h1>

      {/* Animal Type Form */}
      <div className="form-section">
        <h2>Add Animal Type</h2>
        <input
          type="text"
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}
          placeholder="Enter animal type (e.g. Chicken)"
        />
        <button onClick={saveAnimalType}>Save Animal Type</button>
      </div>

      {/* Daily Record Form */}
      <div className="form-section">
        <h2>Add Daily Animal Record</h2>

        <label>
          Record Date:
          <select
            value={selectedRecordId}
            onChange={(e) => setSelectedRecordId(e.target.value)}
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
            value={selectedTypeId}
            onChange={(e) => setSelectedTypeId(e.target.value)}
          >
            <option value="">-- Select animal type --</option>
            {animalTypes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>

        <input
          type="number"
          value={alive}
          onChange={(e) => setAlive(e.target.value)}
          placeholder="Alive count"
        />
        <input
          type="number"
          value={deaths}
          onChange={(e) => setDeaths(e.target.value)}
          placeholder="Deaths count"
        />
        <button onClick={saveAnimalRecord}>Save Daily Record</button>
      </div>
    </div>
  );
}

export default Animals;
