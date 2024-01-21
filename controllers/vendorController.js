const Vendor = require('../models/vendorModels.js');
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const uploadToCloud = require("../config/cloudinary");


const getAllVendors = async (req, res) => {
    try {
        const vendor = await Vendor.find({});
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVendorById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await Vendor.findById(id);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        res.status(200).json(vendor);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const createVendor = async (req, res) => {
  try {
    console.log(req.files)
    const { userName, email, password, companyName, firstName, lastName, phoneNumber } = req.body;
    var idCard, tradeLicense
    const encryptedPassword = await bcrypt.hash(password, 8);
    if (req.files.idCard) {
      const {url} = await uploadToCloud(req.files.idCard[0].filename);
      idCard = url
    }
    if (req.files.tradeLicense) {
      const  {url}  = await uploadToCloud(req.files.tradeLicense[0].filename);
      tradeLicense = url
    }

    const vendorData = {
      firstName,
      lastName,
      userName,
      companyName,
      email,
      phoneNumber,
      password: encryptedPassword,
      idCard,
      tradeLicense
    }
    
    const newVendor = await Vendor.create(vendorData);

    res
      .status(201)
      .send({
        vendor: newVendor,
        message: "Vendor Created Saved Successfully !",
        success: true
      });
    
    await newVendor.save();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginVendor = async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await Vendor.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );
     
      return res.status(200).send({ message: "Vendor Logged in", token,vendor:user });
    }
    res.status(400).send({ message: "Invalid Credentials" ,success:false});
  } catch (error) {
    return res.status(500).send({ message: error.message,success:false });
  }
}

const updateVendorById = async (req, res) => {
  try {
        const { id } = req.params;
        const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

      res.status(200).json({ vendor: updatedVendor });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

const approveVendorById = async (req, res) => {
  try {
        const { id } = req.params;
        const updatedVendor = await Vendor.findByIdAndUpdate(id, {status:"Approved"}, { new: true });

        if (!updatedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

      res.status(200).json({ vendor: updatedVendor,message:"Vendor Approved Successfully" });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

const rejectVendorById = async (req, res) => {
  try {
        const { id } = req.params;
        const updatedVendor = await Vendor.findByIdAndUpdate(id, {status:"Rejected"}, { new: true });

        if (!updatedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

      res.status(200).json({ vendor: updatedVendor,message:"Vendor Rejected Successfully" });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

const deleteVendorById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVendor = await Vendor.findByIdAndDelete(id);

        if (!deletedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        res.status(200).json({ message: "Vendor deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getVendorProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const vendor = await Vendor.findById(id);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        res.status(200).json(vendor);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllVendors,
    getVendorById,
    createVendor,
    loginVendor,
    updateVendorById,
    deleteVendorById,
  getVendorProfile,
  approveVendorById,
    rejectVendorById
};
