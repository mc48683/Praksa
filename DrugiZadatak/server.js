
const data = require("./data.json");
const fs = require('fs');

const express = require('express');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000);



app.get('/users/:userID', (req, res) => {
    let user = data.users.find(user => user.id == req.query.userID);
    if (user === undefined) res.send("User not found");
    res.send(
        `<p>ID: ${user.id}</p>
        <p>Name: ${user.name}</p>
        <p>Email: ${user.email}</p>`)
        
})


app.get('/posts/:postID', (req, res) => {
    let post = data.posts.find(post => post.id == req.query.postID);
    if (post === undefined) res.send("Post not found");
    res.send(
        `<p>ID: ${post.id}</p>
        <p>Title: ${post.title}</p>
        <p>Body: ${post.body}</p>
        <p>UserID: ${post.user_id}</p>
        <p>Last update: ${post.last_update}</p>
        `)
})

app.get('/dates/:datumOd/:datumDo', (req, res) => {
    const start = Date.parse(req.query.datumOd);
    const end = Date.parse(req.query.datumDo);
    const dates = data.posts.filter(post => 
        Date.parse(post.last_update) >= start && Date.parse(post.last_update) <= end
    )
    if (dates.length == 0) res.send("Dates not found in this range");
    res.send(dates);
})



app.post('/users/:userID/:noviEmail', (req, res) => {
    let userID = req.query.userID;
    let noviEmail = req.query.noviEmail;
    data.users[userID].email = noviEmail;
    fs.writeFile("./data.json", JSON.stringify(data), function (err) {
        if(err) return console.log(err);
    });
    res.send("Email changed");
})
 

app.put('/posts/:userID/:title/:body', (req, res) => {
    let userID = req.query.userID;
    let title = req.query.title;
    let body = req.query.body;
    let date = new Date();
    let newDate = date.toISOString();
    let newData = {
        "id": Object.keys(data.posts).length+1,
        "title": title,
        "body": body,
        "user_id": userID,
        "last_update": newDate.slice(0,10) + newDate.slice(11,19)
    };

    data.posts.push(newData);
    fs.writeFile("./data.json", JSON.stringify(data), function (err) {
        if(err) return console.log(err);
    });
    res.send("New post created");
});