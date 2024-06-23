const express = require('express');
const mongose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const started = async() => {
    try{
        mongose.set('strictQuery', false);

        await mongose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log('MongoDB connected');
        
        app.listen(PORT, () => {
            console.log('open localhost ' + PORT);
        });
    } catch (e) {
        console.log('assosiy indexda ERROR ' + e);
        process.exit(1);
    }
} 

started();


// pass: 630A5ovhU57qk1a0
// mongodb+srv://abshoxruz:<password>@cluster0.r5gvoke.mongodb.net/
