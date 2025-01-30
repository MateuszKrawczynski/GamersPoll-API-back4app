let express = require('express');
let sqlite = require('sqlite3').verbose();
let db = new sqlite.Database("database.db");

var cors = require('cors');


let app = express();

app.use(cors());

app.listen(6857, ()=>{
    console.log("API running on 6857");
});

app.get("/get/xbox",(req,res) => {
    db.all("SELECT * FROM main WHERE platform=?",["Xbox"],(err,rows) => {
        res.send(`${rows[0].votes}`);
    });
});

app.get("/get/playstation",(req,res) => {
    db.all("SELECT * FROM main WHERE platform=?",["Playstation"],(err,rows) => {
        res.send(`${rows[0].votes}`);
    });
});
app.get("/get/pc",(req,res) => {
    db.all("SELECT * FROM main WHERE platform=?",["PC"],(err,rows) => {
        res.send(`${rows[0].votes}`);
    });
});

app.get("/vote/xbox",(req,res) => {
    db.all("SELECT * FROM main WHERE platform=?",["Xbox"],(err,rows)=>{
        db.run("UPDATE main SET votes=? WHERE platform=? ",[(rows[0].votes)+1,"Xbox"],()=>{
            res.send("ok");
        });
    });
    
});
app.get("/vote/playstation",(req,res) => {
    db.all("SELECT * FROM main WHERE platform=?",["Playstation"],(err,rows)=>{
        db.run("UPDATE main SET votes=? WHERE platform=? ",[(rows[0].votes)+1,"Playstation"],()=>{
            res.send("ok");
        });
    });
    
});
app.get("/vote/pc",(req,res) => {
    db.all("SELECT * FROM main WHERE platform=?",["PC"],(err,rows)=>{
        db.run("UPDATE main SET votes=? WHERE platform=? ",[(rows[0].votes)+1,"PC"],()=>{
            res.send("ok");
        });
    });
    
});

