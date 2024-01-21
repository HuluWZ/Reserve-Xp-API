const Admin = require('../models/adminModels.js');
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const getAllAdmins = async (req, res) => {
    try {
        const admin = await Admin.find({});
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json(admin);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};


const getAdminProfile = async (req, res) => {
    try {
        const { id } = req.Admin;
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json(admin);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const createAdmin = async (req, res) => {
    try {
        const { email, password,fullName,username} = req.body;
        const encryptedPassword = await bcrypt.hash(password, 8);
    const AdminData = {email, password: encryptedPassword,fullName,username}
    
    const newAdmin = await Admin.create(AdminData);

    res
      .status(201)
      .send({
        user: newAdmin,
        message: "Admin Created Saved Successfully !",
        success: true
      });
    
    await newAdmin.save();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = sign(
        { user_id: admin._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );
     
      return res.status(200).send({ message: "Admin Logged in", token,admin });
    }
    res.status(400).send({ message: "Invalid Credentials" ,success:false});
  } catch (error) {
    return res.status(500).send({ message: error.message,success:false });
  }
}

const updateAdminById = async (req, res) => {
  try {
        const { id } = req.params;
        const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

      res.status(200).json({ Admin: updatedAdmin });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

const deleteAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAdmins,
    getAdminById,
    createAdmin,
    loginAdmin,
    updateAdminById,
   deleteAdminById,
    getAdminProfile
};
