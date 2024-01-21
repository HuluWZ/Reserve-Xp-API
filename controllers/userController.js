const User = require('../models/UserModel.js');
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};


const getUserProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password,firstName,lastName,userName} = req.body;
        const encryptedPassword = await bcrypt.hash(password, 8);
        console.log(req.body)
    const userData = {email, password: encryptedPassword,userName,firstName,lastName}
    
    const newUser = await User.create(userData);

    res
      .status(201)
      .send({
        user: newUser,
        message: "User Created Saved Successfully !",
        success: true
      });
    
    await newUser.save();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );
     
      return res.status(200).send({ message: "User Logged in", token,user });
    }
    res.status(400).send({ message: "Invalid Credentials" ,success:false});
  } catch (error) {
    return res.status(500).send({ message: error.message,success:false });
  }
}

const updateUserById = async (req, res) => {
  try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

      res.status(200).json({ user: updatedUser });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    loginUser,
    updateUserById,
   deleteUserById,
    getUserProfile
};
