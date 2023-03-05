
const data = require("./data.json");
const fs = require('fs');

const express = require('express');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000);



app.get('/:userID', (req, res) => {
    let user = data.users.find(user => user.id == req.params.userID);
    res.send(
        `<p>ID: ${user.id}</p>
        <p>Name: ${user.name}</p>
        <p>Email: ${user.email}</p>`)
})


app.get('/:postID', (req, res) => {
    let post = data.posts.find(post => post.id == req.params.postID);
    res.send(
        `<p>ID: ${post.id}</p>
        <p>Title: ${post.title}</p>
        <p>Body: ${post.body}</p>
        <p>UserID: ${post.user_id}</p>
        <p>Last update: ${post.last_update}</p>
        `)
})

app.get('/:datumOd/:datumDo', (req, res) => {
    const start = Date.parse(req.params.datumOd);
    const end = Date.parse(req.params.datumDo);
    const dates = data.posts.filter(post => 
        Date.parse(post.last_update) >= start && Date.parse(post.last_update) <= end
    )
    res.send(dates);
})



app.post('/:userID/:noviEmail', (req, res) => {
    let userID = req.params.userID;
    let noviEmail = req.params.noviEmail;
    data.users[userID].email = noviEmail;
    fs.writeFile("./data.json", JSON.stringify(data), function (err) {
        if(err) return console.log(err);
    });
    res.send("Email changed");
})
 

app.put('/:userID/:title/:body', (req, res) => {
    let userID = req.params.userID;
    let title = req.params.title;
    let body = req.params.body;
    let date = new Date();
    let newDate = date.toISOString();
    let newData = {
        "id": Object.keys(data.posts).length+1,
        "title": title,
        "body": body,
        "user_id": userID,//"2023-03-05T20:51:42.516Z"
        "last_update": newDate.slice(0,10) + newDate.slice(11,19)
    };

    data.posts.push(newData);
    fs.writeFile("./data.json", JSON.stringify(data), function (err) {
        if(err) return console.log(err);
    });
    res.send("New post created");
});