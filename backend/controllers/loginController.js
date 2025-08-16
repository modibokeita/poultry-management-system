import { getDbConnection } from "../db.js"
import bcrypt from 'bcrypt'

export async function login(req, res){
    const {email, password} = req.body

    let db
    try {
        db = await getDbConnection()

        const query = 'SELECT email, password FROM users WHERE email = ?'
        const users = await db.all(query, [email])

        console.log(users)
        if (users.length === 0){
           return res.status(400).json({message: 'User not found'})
        }
        const user = users[0]
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid){
          return  res.status(400).json({message: 'Wrong Passoword'})
        }

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
