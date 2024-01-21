const Tenant = require('../tenant/tenant.js');
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const getAllTenants = async (req, res) => {
    try {
        const tenant = await Tenant.find({});
        res.status(200).json(tenant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTenantById = async (req, res) => {
    try {
        const { id } = req.params;
        const tenant = await Tenant.findById(id);

        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

        res.status(200).json(tenant);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};



const createTenant = async (req, res) => {
  try {
    const { email, password,firstName,lastName,phoneNumber ,businessName} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 8);
    const tenantData = {email, password: encryptedPassword,phoneNumber,firstName,lastName,businessName}
    
    const newTenant = await Tenant.create(tenantData);

    res
      .status(201)
      .send({
        tenant: newTenant,
        message: "Tenant Created Saved Successfully !",
        success: true
      });
    
    await newTenant.save();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginTenant = async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await Tenant.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );
     
      return res.status(200).send({ message: "Tenant Logged in", token,tenant:user });
    }
    res.status(400).send({ message: "Invalid Credentials" ,success:false});
  } catch (error) {
    return res.status(500).send({ message: error.message,success:false });
  }
}

const activateTenantById = async (req, res) => {
  try {
        const { id } = req.params;
        const updatedTenant = await Tenant.findByIdAndUpdate(id, {isActive: true}, { new: true });

        if (!updatedTenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

      res.status(200).json({ tenant: updatedTenant,message: "Tenant Activated Successfully" });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

const deactivateTenantById = async (req, res) => {
  try {
        const { id } = req.params;
        const updatedTenant = await Tenant.findByIdAndUpdate(id, {isActive: false}, { new: true });

        if (!updatedTenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

      res.status(200).json({ tenant: updatedTenant, message: "Tenant Deactivated Successfully" });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

const deleteTenantById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTenant = await Tenant.findByIdAndDelete(id);

        if (!deletedTenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

        res.status(200).json({ message: "Tenant deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTenants,
    getTenantById,
    createTenant,
    loginTenant,
    activateTenantById,
    deleteTenantById,
    deactivateTenantById
};
