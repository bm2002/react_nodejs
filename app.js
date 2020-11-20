const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
// const {bodyParser} = require('body-parser')
const cors = require('cors');

const app = express()
app.use(express.json({ extended: true }))

// const cors = require('cors');
// app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// app.use(cors()); 
// app.options('*', cors());

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