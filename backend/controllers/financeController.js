import { getDbConnection } from "../db.js";

export async function addFinance(req, res){
    const { entry_date, type, amount, description } = req.body
    let db
    try {
        db = await getDbConnection()
        await db.exec('BEGIN TRANSACTION')
        await db.run(`
            INSERT INTO finances(entry_date, type, amount, description, user_id) VALUES(?, ?, ?, ?, ?)`,
            [entry_date, type, amount, description, 1]
        )
        await db.exec('COMMIT')
        console.log("finance added")
        return res.status(201).json({message: 'finance added'})
    } catch (error) {
        await db.exec('ROLLBACK')
        return res.status(500).json({error: error})
    }finally{
        await db.close()
        console.log('DB closed')
    }
}
export async function getFinance(req, res){
    let db
    try {
        db = await getDbConnection()
        const query = 'SELECT * FROM finances'
        const financeRecords =  await db.all(query)

        return res.status(201).json(financeRecords)
    } catch (error) {

        return res.status(500).json({error: error})
    }finally{
        await db.close()
        console.log('DB closed')
    }
}