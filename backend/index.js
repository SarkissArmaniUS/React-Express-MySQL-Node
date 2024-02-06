import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"jw.2t2-Bc@ZQ6e",
    database: "test"
})

app.use(express.json())
app.use(cors())

// getting request demo
app.get("/", (req, res)=>{
    res.json("DataBase")
})

app.get("/albums", (req, res)=>{
    const q = "SELECT * FROM albums;"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/albums", (req, res) => {
    const q = "INSERT INTO albums (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Album has been created successfully");
    });
});

app.delete("/albums/:id", (req, res) => {
    const albumsId = req.params.id;
    const q = "DELETE FROM albums WHERE id = ?"

    db.query(q, [albumsId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Album has been deleted successfully");
    });
});

app.put("/albums/:id", (req, res) => {
    const albumsId = req.params.id;
    const q = "UPDATE albums SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values=[
        req.body.title, req.body.desc, req.body.price, req.body.cover,
    ]

    db.query(q, [...values, albumsId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Album has been updated successfully");
    });
});

app.listen(8800, ()=>{
    console.log("Connected to bk")
});
