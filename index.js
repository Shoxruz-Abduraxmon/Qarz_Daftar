const express = require('express');
const mongose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const PostMadel = require('./models/postMadel');

const app = express();


app.use(express.json());

app.use(PostMadel);
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

app.get('/', (req, res) => {
    res.status(200).send("Boshladik Shoxruz");
});

try{
    app.post('/', async () => {
        let {title, body} = req.body;
        let newPost = await PostMadel.create({
            title, 
            body
        });
        res.status(201).json(newPost);
    });
} catch (e) {
    res.status(500).json(e);
}


app.delete('/:id', (req, res) => {
    let {id} = req.params;
    req.send(id);
});

app.put('/:id', (req, res) => {
    let {id} = req.params;
    let body = req.body;

    res.json(id, body);
});

