const express = require('express');
const { uploadImage } = require('../config/imageUpload');
const db = require('../config/dbConnection');

const routes  = express.Router();

routes.post("/add-user", uploadImage.single('profileImage'), async (req, res) => {
    const {firstname, lastname, email, password} = req.body;
    let imagePath = "";
    if(req.file){
        imagePath = `/uploads/${req.file.filename}`;
    }

    let admin = await db.query(`insert into admin (firstname, lastname, email, password, profileImage) values ('${firstname}', '${lastname}', '${email}', '${password}', '${imagePath}' )`)
    if(admin){
        return res.json({message: "Admin Added"})
    }else{
        return res.json({message: "Admin not Added"})
    }

})

routes.get("/", async (req, res) => {
    let admins = await db.query(`select * from admin`);
    return res.json({message: "Get Admins", data: admins.rows})
})

routes.put("/update-user/:id", uploadImage.single('profileImage'), async (req, res) => {
    const {firstname, lastname, email, password} = req.body;
    let imagePath = "";
    if(req.file){
        imagePath = `/uploads/${req.file.filename}`;
    }

    let admin = await db.query(`update admin set firstname = '${firstname}', lastname ='${lastname}', email ='${email}', password='${password}', profileImage='${imagePath}' where id = ${req.params.id}`)
    if(admin){
        return res.json({message: "Admin Update Success"})
    }else{
        return res.json({message: "Admin not Updated."})
    }

})

routes.delete("/delete-user/:id", async (req, res) => {
    let admin = await db.query(`delete from admin where id = ${req.params.id}`)
    if(admin){
        return res.json({message: "Admin Delete Success"})
    }else{
        return res.json({message: "Admin not Deleted"})
    }

})

module.exports = routes;