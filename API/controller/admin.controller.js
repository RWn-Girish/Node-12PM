const Admin = require("../model/admin.model");
const path = require("path");
const fs = require("fs");


exports.getAllAdmins = async (req, res) => {
    try {
        let admins = await Admin.find();
        return res.status(200).json({message: "Get All Admins", data: admins});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getAdmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if(!admin){
            return res.status(404).json({message: "Admin Not Found"});
        }else{

            return res.status(200).json({message: "Get Single Admin", data: admin});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


exports.updateAdmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if(!admin){
            return res.status(404).json({message: "Admin Not Found"});
        }else{
            if(req.file){
                if(admin.profileImage != ""){
                    let imagepath = path.join(__dirname, "..", admin.profileImage);
                    try {
                        await fs.unlinkSync(imagepath);
                    } catch (error) {
                        console.log("File is Missing...")
                    }
                }

                let imagePath = `/uploads/${req.file.filename}`;
                req.body.profileImage = imagePath;
            }

            admin = await Admin.findByIdAndUpdate(admin._id, req.body, {new: true})
            return res.status(200).json({message: "Update Admin Success", data: admin});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if(!admin){
            return res.status(404).json({message: "Admin Not Found"});
        }else{
                if(admin.profileImage != ""){
                    let imagepath = path.join(__dirname, "..", admin.profileImage);
                    try {
                        await fs.unlinkSync(imagepath);
                    } catch (error) {
                        console.log("File is Missing...")
                    }
                }
            admin = await Admin.findByIdAndDelete(admin._id)
            return res.status(200).json({message: "Delete Admin Success"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}