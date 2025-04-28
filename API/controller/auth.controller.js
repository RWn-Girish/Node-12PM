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

exports.myProfile = async (req, res) => {
    return res.json({message: "Profile Page", data: req.user});
}


exports.changePassword = async(req, res) => {
    try {
        let user = req.user;
        const {current_password, new_password, confirm_password} = req.body;

        let matchPass = await bcrypt.compare(current_password, user.password);
        if(!matchPass){
            return res.json({message: 'Current Password is not matched!!!'});
        }else{
            if(current_password != new_password){
                if(new_password == confirm_password){
                    let hashPassword = await bcrypt.hash(new_password, 10);
                    await Admin.findByIdAndUpdate(user._id, {password: hashPassword}, {new: true});
                    return res.json({message: "Password Changed Success"});
                }else{
                    return res.json({message: 'Confirm Password and New Password is not matched!!!'});
                }

            }else{
                return res.json({message: 'Current Password and New Password is matched!!!'});
            }
        }
    } catch (error) {
        
    }
}