import { getDbConnection } from "../db.js";
import { users } from "./data.js";

async function seed(){
    const db = await getDbConnection()

    try {
        await db.exec('BEGIN TRANSACTION')
        
        for (const {username, email, password} of   users){
            await db.run(`
                    INSERT INTO users(username, email, password) VALUES(?, ?, ?)`,
                    [username, email, password]
                )
        }
        await db.exec('COMMIT')
        console.log("all recored successfully")
    } catch (error) {
        await db.exec('ROLLBACK')
        console.log(error)
    }finally{
        await db.close()
        console.log('db connection closed')
    }
}
seed()