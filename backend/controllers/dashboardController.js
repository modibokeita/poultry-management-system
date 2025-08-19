import { getDbConnection } from "../db.js"

export async function getDashboard(req, res){
    res.json({message: 'Dashboard is displayed'})
}