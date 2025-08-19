import { getDbConnection } from "./db.js";

async function createTable() {
    const db = getDbConnection();

    try {
        // Users table
        await (await db).exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL, 
                email TEXT NOT NULL, 
                password TEXT NOT NULL
            )
        `);

        // Animal types (chicken, turkey, duck, etc.)
        await (await db).exec(`
            CREATE TABLE IF NOT EXISTS animal_types (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            )
        `);

        // Daily records (general info for the day)
        await (await db).exec(`
            CREATE TABLE IF NOT EXISTS daily_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                record_date DATE NOT NULL,
                feed_used REAL DEFAULT 0, -- in kg or bags
                user_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        // Link daily records with animals
        await (await db).exec(`
            CREATE TABLE IF NOT EXISTS daily_record_animals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                daily_record_id INTEGER NOT NULL,
                animal_type_id INTEGER NOT NULL,
                alive INTEGER DEFAULT 0,
                deaths INTEGER DEFAULT 0,
                FOREIGN KEY (daily_record_id) REFERENCES daily_records(id),
                FOREIGN KEY (animal_type_id) REFERENCES animal_types(id)
            )
        `);

        // Finances table
        await (await db).exec(`
            CREATE TABLE IF NOT EXISTS finances (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                entry_date DATE NOT NULL,
                type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
                amount REAL NOT NULL,
                description TEXT,
                user_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        // Eggs table
        await (await db).exec(`
            CREATE TABLE IF NOT EXISTS egg_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                record_date DATE NOT NULL,
                quantity INTEGER DEFAULT 0,
                user_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        // Inventory table
        await (await db).exec(`
            CREATE TABLE IF NOT EXISTS inventory (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                item_name TEXT NOT NULL, -- e.g. feed, medicine, equipment
                quantity REAL NOT NULL,
                unit TEXT, -- kg, bags, pieces
                user_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        console.log("Tables were created successfully");

    } catch (error) {
        console.log("Some error:", error);
    } finally {
        (await db).close();
        console.log("DB connection closed");
    }
}

createTable();
