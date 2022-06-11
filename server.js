const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require("cors");
const asyncHandler = require('express-async-handler');
const api = require('./api');
const bodyParser = require("body-parser");

// Load config
dotenv.config({ path: './config/config.env' });

// connect DB
connectDB(
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    process.env.DATABASE_NAME
);

// app init
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/assets', express.static('src/assets'));
app.use('/uploads', express.static('src/assets/uploads'));

// Port assign
const port = process.env.PORT || 3000;

// Get Environment
const env = app.get('env');

// morgan lib only for development environment logs only
if (env === 'development') {
    app.use(morgan('dev'));
}

app.use("/api",
    asyncHandler(async (req, res, next) => {
        try {
            // console.log("---Request header--", req.headers);
            console.log("---Request Query---", req.query);
            console.log("---Request Body----", req.body);
            // console.log("---Request Path----", req.path);
            // console.log("---Request File----", req.file);
            next();
        } catch (error) {
            next();
        }
    }), api
);

app.use('/uploads', express.static('src/uploads'));



app.listen(port, () =>
    console.log(`API running on http://localhost:${port} on ${env} mode`)
);

