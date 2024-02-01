const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user.js');
const jobRoute = require('./routes/job.js');
const bookMarkRoute = require('./routes/bookmark');


const app = express();
dotenv.config();
const url = process.env.MONGO_URL;

mongoose.connect(url)
    .then(() => { console.log("DB CONNECT") })
    .catch((e) => { console.log(e); });

app.use(express.json());
app.use("/api/", authRoute);
app.use("/api/users/",userRoute);
app.use("/api/jobs/",jobRoute);
app.use("/api/bookMark/",bookMarkRoute);
// process.env.VARIABLE_NAME
app.listen(process.env.PORT || 3008,"0.0.0.0", () => console.log(`Example app listening on port ${process.env.PORT || 5002}!`));
