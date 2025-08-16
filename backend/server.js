import express from 'express'
import { userRouter } from './routes/userRoute.js'
import cors from "cors"
const PORT = 8000

const app = express()
app.use(cors())
app.use(express.json());

app.use('/auth', userRouter)
app.use((req, res) => {
    res.status(404).json({message: "route not found"})
})

app.listen(PORT, () => console.log(`Server connected on port: ${PORT}`))