const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
// const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser:true})
const port = 8000;


// mongodb schema
const contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    desc:String,
    age:String
}) ;

const Contact = mongoose.model('Contact',contactSchema)

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'))

app.get('/', (req,res)=>{
    res.status(200).render('index.pug')
})

app.get('/contact', (req,res)=>{
    res.status(200).render('contact.pug')
})

app.post('/contact', (req,res)=>{
    console.log(req.body);
    let myData = new Contact(req.body);
    myData.save().then(()=>{
        res.render('index.pug')
    }).catch(()=>{
        res.render('contact.pug')
    })
})


app.listen(port,()=>{
    console.log("Server is Running "+port)
})