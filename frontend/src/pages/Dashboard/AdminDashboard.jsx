import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [eggs, setEggs] = useState(0);
  const [mortality, setMortality] = useState(0);
  const [feed, setFeed] = useState(0);
  const [animalData, setAnimalData] = useState()

  useEffect(() => {
    fetch("http://localhost:8000/api/eggs")
      .then((res) => res.json())
      .then((data) => setEggs(data.reduce((sum, e) => sum + e.quantity, 0)));

    fetch("http://localhost:8000/api/animals")
      .then((res) => res.json())
      .then((data) => setMortality(data.reduce((sum, m) => sum + m.deaths, 0)));
    fetch("http://localhost:8000/api/daily-records")
      .then((res) => res.json())
      .then((data) => setAnimalData(data.reduce((sum, a) => sum + a.alive, 0)));
      
    fetch("http://localhost:8000/api/records")
      .then((res) => res.json())
      .then((data) => setFeed(data.reduce((sum, r) => sum + (r.feed_used || 0), 0)));
  }, []);

 console.log()
  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="inner-container">
        <div className="eggs">
          <h2>Total des Oeufs</h2>
          <p>{eggs}</p>
        </div>
        <div className="dashboard-mortality">
          <h2>Mortalité totale</h2>
          <p>{mortality}</p>
        </div>
        <div className="dashboard-feed">
          <h2>Quantité totale d'aliments utilisés</h2>
          <p>{feed} kg</p>
        </div>
        <div className="dashboard-feed">
          <h2>Total Volaille</h2>
          <p>{animalData}</p>
        </div>
      </div>
    </div>
  );
}

