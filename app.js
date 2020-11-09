const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
// const {bodyParser} = require('body-parser')

const app = express()
app.use(express.json({ extended: true }))


app.use('/api/auth', require('./routes/auth.routes'),express.json());

// app.use(express.json({ extended: true }))

const PORT = config.get('port') || 3002;
const CONNECT = config.get('connectDB');

async function start() {
    try {
        await mongoose.connect(CONNECT,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                // useFindAndModify: false,
                useCreateIndex: true
            });

            app.listen(PORT, () => {
                console.log(`server start on port ${PORT}`)
            });

    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

// mongoose.connect('mongodb://localhost:27017/football', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
// });

start();





// console.log('start app')