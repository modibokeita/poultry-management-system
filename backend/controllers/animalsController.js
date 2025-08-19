import { getDbConnection } from "../db.js";

export async function addAnimalsType(req, res) {
  const { name } = req.body;
  let db;
  try {
    db = await getDbConnection();
    await db.exec("BEGIN TRANSACTION");
    await db.run(`INSERT INTO animal_types(name) VALUES(?)`, [name]);
    await db.exec("COMMIT");
    console.log('animals type added')
    return res.status(201).json({ message: "Animal type added" });
  } catch (error) {
    if (db) await db.exec("ROLLBACK");
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    if (db) await db.close();
    console.log("DB connection Closed");
  }
}

export async function addAnimals(req, res) {
  const { daily_record_id, animal_type_id, alive, deaths } = req.body;
  let db;
  try {
    db = await getDbConnection();
    await db.exec("BEGIN TRANSACTION");
    await db.run(
      `INSERT INTO daily_record_animals(daily_record_id, animal_type_id, alive, deaths) 
       VALUES(?, ?, ?, ?)`,
      [daily_record_id, animal_type_id, alive, deaths]
    );
    await db.exec("COMMIT");
    console.log('animals added')
    return res.status(201).json({ message: "Animal record added" });
  } catch (error) {
    if (db) await db.exec("ROLLBACK");
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    if (db) await db.close();
    console.log("DB connection Closed");
  }
}

export async function getAnimals(req, res) {
  let db;
  try {
    db = await getDbConnection();
    const rows = await db.all(`
      SELECT dr.record_date, at.name AS animal, dra.deaths
      FROM daily_record_animals dra
      JOIN daily_records dr ON dra.daily_record_id = dr.id
      JOIN animal_types at ON dra.animal_type_id = at.id
      ORDER BY dr.record_date DESC
    `);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    if (db) await db.close();
  }
}
export async function getAnimalTypes(req, res) {
  let db;
  try {
    db = await getDbConnection();
    const rows = await db.all(`SELECT id, name FROM animal_types`);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    if (db) await db.close();
  }
}

export async function getDailyRecords(req, res) {
  let db;
  try {
    db = await getDbConnection();
    const rows = await db.all(`SELECT * FROM daily_record_animals`);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    if (db) await db.close();
  }
}
