const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const exhbs = require('express-handlebars');
const dbo = require('./db');

app.engine('hbs',exhbs.engine({layoutsDir:'views/',defaultLayout:"main",extname:"hbs"}))
app.set('view engine','hbs');
app.set('views','views')

app.get('/', async (req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    const cursor = collection.find({})
    let employees = await cursor.toArray();

    let message = '';
    res.render('main',{message,employees})
})

app.listen(8000,()=>{console.log('Listening to 8000 port');})

