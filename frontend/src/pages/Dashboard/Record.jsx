import React, { useEffect, useState } from "react";

function Record() {
  const [feedUsed, setFeedUsed] = useState("");


  const saveRecord = async () => {
    await fetch("http://localhost:8000/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        record_date: new Date().toISOString().split("T")[0],
        feed_used: parseFloat(feedUsed),
        user_id: 1,
      }),
    });
    setFeedUsed("");
  };

  function handleSubmit() {
    if (feedUsed === "" || isNaN(feedUsed)) {
      alert("Please add a value before saving.");
      return;
    }
    saveRecord();
  }

  function handleChange(e) {
    setFeedUsed(e.target.value);
  }

  return (
    <div className="records-container">
      <h1>Daily Records</h1>

      <div className="feed-record">
        <h2>Feed Used (kg)</h2>
        <input
          type="number"
          value={feedUsed}
          onChange={handleChange}

        />
        <button onClick={handleSubmit}>
          Save Record
        </button>
      </div>
    </div>
  );
}

export default Record;
