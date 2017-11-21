'use strict'
const express = require('express');
const app = express();
const path = require('path');

// app.use(express.static(path.resolve(__dirname, '/public/demo.html')));

app.get('/', function(req, res){
    res.set('Content-Type', 'content-type: text/html; charset=UTF-8');
    res.status(200);
    res.sendFile(path.resolve(__dirname, './mdn_background_demo/background_demo.html'));
})

app.get('/style.css', function(req,res){
    res.set('Content-Type', 'content-type: test/css; charset=UTF-8');
    res.status(200);
    res.sendFile(path.resolve(__dirname, './mdn_background_demo/style.css'));
})

app.get('/background.js', function(req,res){
    res.set('Content-Type', 'content-type: application/javascript;');
    res.status(200);
    res.sendFile(path.resolve(__dirname, './mdn_background_demo/background.js'));
})
// to do ---------------------------------------------------------------
// this should be done with app.use(express.static) - what gives?
// app.use('/todo', express.static(path.resolve(__dirname, './todo_demo')));

app.get('/todo', function(req, res){
    res.set('Content-Type', 'content-type: text/html; charset=UTF-8');
    res.status(200);
    console.log(path.resolve(__dirname, './todo_demo/todo.html'));        
    res.sendFile(path.resolve(__dirname, './todo_demo/todo.html'));
})

app.get('/todo/todo.css', function(req,res){
    res.set('Content-Type', 'content-type: text/css; charset=UTF-8');
    res.status(200);
    console.log(path.resolve(__dirname, './todo_demo/todo.css'));    
    res.sendFile(path.resolve(__dirname, './todo_demo/todo.css'));
})

app.get('/todo/todo.js', function(req,res){
    res.set('Content-Type', 'content-type: text/js; charset=UTF-8');
    res.status(200);
    console.log(path.resolve(__dirname, './todo_demo/todo.js'));    
    res.sendFile(path.resolve(__dirname, './todo_demo/todo.js'));
})

        //  PARAGRAPH TEST
app.get('/paragraphs', function(req, res){
    res.set('Content-Type', 'content-type: text/html; charset=UTF-8');
    res.status(200);
    res.sendFile(path.resolve(__dirname, './add-paragraphs/paragraphs.html'));
})

app.get('/paragraphs/paragraphs.css', function(req,res){
    res.set('Content-Type', 'content-type: text/css; charset=UTF-8');
    res.status(200);
    res.sendFile(path.resolve(__dirname, './add-paragraphs/paragraphs.css'));
})

app.get('/paragraphs/paragraphs.js', function(req,res){
    res.set('Content-Type', 'content-type: text/js; charset=UTF-8');
    res.status(200);
    res.sendFile(path.resolve(__dirname, './add-paragraphs/paragraphs.js'));
})

// app.use('/synthesis', function(req,res){
//     res.sendFile(path.resolve(__dirname, './speak-easy-synthesis'));
// })
app.use('/synthesis', express.static(path.resolve(__dirname, './speak-easy-synthesis')))
app.use('/phrases', express.static(path.resolve(__dirname, './phrase-matcher')));
// app.use('/paragraph', express.static(path.resolve(__dirname, './add-paragraphs')))

app.listen(3000);

module.exports = app;