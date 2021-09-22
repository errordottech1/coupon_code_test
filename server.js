import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";

import purchaseRouter from './routes/purchase.js'

dotenv.config()

const app = express();

mongoose.connect(process.env.MONGO_DB_URL,
    { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to the database')
        app.listen(5000, () => {
            console.log(`Listening to the port => ${process.env.PORT} for incoming requests`)
        })
    })
    .catch(err => console.error(err));

app.use('/purchase', purchaseRouter)

app.use(express.urlencoded({ extended: true }))