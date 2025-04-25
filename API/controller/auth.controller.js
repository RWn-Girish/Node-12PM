const Admin = require("../model/admin.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerAdmin = async(req, res) => {
    try {
        let admin = await Admin.findOne({email: req.body.email});
        if(admin){
            return res.json({message: "Admin Already Register"})
        }
        let imagepath = "";
        if(req.file){
            imagepath = `/uploads/${req.file.filename}`;
        }
        req.body.profileImage = imagepath;
        let hashPassword = await bcrypt.hash(req.body.password, 10)
        // console.log(hashPassword);
        let newAdmin = await Admin.create({...req.body, password: hashPassword});
        if(newAdmin){
            return res.status(201).json({message: "Admin Register Success"});
        }else{
            return res.status(500).json({message: "Smothing Wrong"});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


exports.loginAdmin = async (req, res) => {
    try {
        let {email, password} = req.body;

        let admin = await Admin.findOne({email: email});
        if(!admin){
            return res.json({message: "Admin not found"})
        }else{
            let matchPassword = await bcrypt.compare(password, admin.password);
            if(!matchPassword){
                return res.json({message: "Email and Password is not matched!!!"});
            }else{

                let payload = {
                    userID: admin._id,
                }
                let token = await jwt.sign(payload, 'test');
                return res.json({message: "Login Success", token});
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}