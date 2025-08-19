import { getDbConnection } from "../db.js"

export async function addRecord(req, res){
    const {record_date, feed_used} = req.body
    let db
    try {
        db = await getDbConnection()
        await db.exec('BEGIN TRANSACTION')
        await db.run(`
            INSERT INTO daily_records(record_date, feed_used, user_id) VALUES(?, ?, ?)`,
            [record_date, feed_used, 1]
        )
        await db.exec('COMMIT')
        console.log("record added")
        return res.status(201).json({message: 'record added'})
    } catch (error) {
        res.status(500).json({error})
        console.log(error)
    }finally{
        await db.close()
        console.log('DB closed')
    }

}
export async function getRecord(req, res){
    let db
    try {
        db = await getDbConnection()
        const query = 'SELECT * FROM daily_records'
        const records = await db.all(query)
        console.log("record added")
        return res.status(200).json(records)
    } catch (error) {
        res.status(500).json({error})
        console.log(error)
    }finally{
        await db.close()
        console.log('DB closed')
    }

}
