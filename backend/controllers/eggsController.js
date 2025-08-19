import { getDbConnection } from "../db.js"

export async function Addeggs(req, res){
    const { record_date, quantity } = req.body;
    let db
    try {
        db = await getDbConnection()
        await db.exec('BEGIN TRANSACTION')
        await db.run(`
            INSERT INTO egg_records(record_date, quantity, user_id) VALUES(?, ?, ?)`,
            [record_date, quantity, 1]
        )
        await db.exec('COMMIT')
        console.log("Eggs added")
        return res.status(201).json({message: 'Add Eggs'})
    } catch (error) {
        await db.exec('ROLLBACK')
        console.log(error)
    }finally{
        console.log('Connection closed')
        await db.close()
    }

}
export async function geteggs(req, res){

    let db
    try {
        db = await getDbConnection()
        const query = 'SELECT * FROM egg_records'
        const records = await db.all(query)
        return res.status(200).json(records)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Failed to fetch eggs' });
    }finally{
        console.log('Connection closed')
        await db.close()
    }

}