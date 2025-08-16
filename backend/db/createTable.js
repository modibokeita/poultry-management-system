import { getDbConnection } from "../db.js";

async function createTable(){
    const db = getDbConnection()

    try {
        (await db).exec(`
                CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL, 
                email TEXT NOT NULL, 
                password TEXT NOT NULL
                )
            `
        )
        console.log("table was created")
        
    } catch (error) {
        console.log(" some error:", error)
    }finally{
        (await db).close()
        console.log('DB connection closed')
    }
}
createTable()