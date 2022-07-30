const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//middleware
app.use(cors());
app.use(express.json());


// requires
const connection = require("./db");
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

// database connection
(async () => await connection())();


async function run() {
    try {

        // api homepage
        app.get('/', (req, res) => {
            res.send('Auth server is ready.')
        })

        app.use('/api/', authRoute);
        app.use('/api/user', userRoute);


        // to view images
        app.use('/api/uploads', express.static('uploads'))

    } finally {

    }
}

run().catch(console.dir);

// port listening
const startServer = (port) => {
    try {
        app.listen(port, () => {
            console.log(`Server running: http://localhost:${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit();
    }
};

startServer(process.env.PORT || 5000);
