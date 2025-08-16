import sqlite3 from 'sqlite3'
import path from 'node:path'
import { open } from 'sqlite'


export async function getDbConnection(){
    const db = await open({
        filename: path.join('database.db'),
        driver: sqlite3.Database
    })

    return db
}