import React, { useEffect, useState } from "react";

function Inventory() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");

  const saveItem = async () => {
    await fetch("http://localhost:8000/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item_name: itemName,
        quantity: parseFloat(quantity),
        unit,
        user_id: 1, // replace with logged-in user id
      }),
    });
    setItemName("");
    setQuantity("");

  };



  return (
    <div className="inventory-container">
      <div className="add-item-container">
        <h2>Ajouter Inventory Item</h2>
        <input
          type="text"
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          
        />
        <div className="inventory-option">
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="selection-container"
          >
            <option value="kg">kg</option>
            <option value="bags">bags</option>
            <option value="pieces">pieces</option>
          </select>
        </div>
        <button onClick={saveItem}>
          Save Item
        </button>
      </div>
    </div>
  );
}

export default Inventory;
