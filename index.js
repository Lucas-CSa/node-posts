const express = require('express');
const app = express();
const port = 8080;
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
//Config
    //Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json());
    
    //Server Start
    app.listen(8080, function(){
        console.log("Server Up on https://localhost:"+port);
    })

//Routes

app.get("/", function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('home', {posts: posts});
    }); 
})

app.get("/cad", function(req, res){
    res.render('form');
});

app.get("/del/:id", function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Post Deleted");
    }).catch(function(erro){
        res.send("This post does not exist");
    })
    res.redirect("/");
});

app.post("/add", function(req, res){
    Post.create({
        title: req.body.title,
        content: req.body.content
    }).then(function(){
        res.send("Wow, cool post Bro, Thanks for Sharing!!");
    }).catch(function(erro){
        res.send("Houve um erro: "+erro);
    });
    res.redirect("/");
});