import { getDbConnection } from "../db.js"
export async function addInventory(req, res){
    const {item_name, quantity, unit} = req.body
    let db
    try {
        db = await getDbConnection()
        await db.exec('BEGIN TRANSACTION')
        await db.run(`
                INSERT INTO inventory(item_name, quantity, unit, user_id) VALUES(?, ?, ?, ?)
            `, [item_name, quantity, unit, 1])
        await db.exec('COMMIT')
        console.log('Data saved')
        res.status(201).json({message: 'inventory added'})
    } catch (error) {
        await db.exec('ROLLBACK')
        return res.status(500).json({err: error})
    }finally{
        await db.close()
        console.log("db closed")
    }
}
export async function getInventory(req, res){
y
    let db
    try {
        db = await getDbConnection()
        const query = 'SELECT * FROM inventory'
        const inventoryData = await db.all(query)
        res.status(200).json(inventoryData)
    } catch (error) {
        await db.exec('ROLLBACK')
        return res.status(500).json({err: error})
    }finally{
        await db.close()
        console.log("db closed")
    }
}
