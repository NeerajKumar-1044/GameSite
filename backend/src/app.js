import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

const allowedOrigins = [
    process.env.CORS_ORIGIN 
];

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static("public"))


app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
})); 

import userRouter from './routes/user.routes.js';
import historyRouter from "./routes/history.routes.js"

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", historyRouter);

export default app;