const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()
const userRoute = require('./routes/users_routes')

const app = express();
app.use(express.json());
const PORT = 3000 || process.env.PORT;
app.use('/api/v1/users', userRoute)

// connect to db
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log('connected to db')
})

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});