const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());

mongoose.set('strictQuery', false);

const url = "mongodb+srv://akash:Akash123@cluster0.jsxtowq.mongodb.net/express-tute?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("db connected");
}).catch((err) => {
    console.log(err);
})

const controller=require('./controller/controller')

app.use('/controller',controller)

app.listen(8000, () => {
    console.log('Server started')
})