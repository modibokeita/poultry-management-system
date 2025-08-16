import { getDbConnection } from "../db.js"
import bcrypt from "bcrypt";

export async function signUp(req, res){
    const {username, email, password} = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
    let db
    try {
        db = await getDbConnection()
        await db.exec('BEGIN TRANSACTION')
        const query = 'SELECT username FROM users WHERE email = ?'
        const isUserExist = await db.all(query, [email])

        if (isUserExist.length > 0){
            await db.exec('ROLLBACK')
            return res.status(400).json({message:'User already exist'})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
         
        await db.run(`
            INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [username, email, hashedPassword]
        )
        await db.exec('COMMIT')
        res.status(201).json({message: 'Signing Up success'})
    } catch (error) {
         console.error('Signup error:', error);
      if (db)  await db.exec('ROLLBACK')
        res.status(500).json({ message: 'Internal server error' });
    }finally{
        if (db) await db.close()
    }
    
}