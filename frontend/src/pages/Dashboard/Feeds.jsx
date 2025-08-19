import React, { useEffect, useState } from "react";

function Feeds() {
  const [records, setRecords] = useState([]);

  const fetchFeed = async () => {
    try {
      
      const res = await fetch("http://localhost:8000/api/records");
      const data = await res.json();
      setRecords(data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const totalFeed = records.reduce((sum, r) => sum + (r.feed_used || 0), 0);

  return (
    <div className="feed-container">
      <h1>Feed Usage</h1>
      <div className="feed-usage">
        <h2>Total Feed Used</h2>
        <p>{totalFeed} kg</p>
      </div>
    </div>
  );
}

export default Feeds;
