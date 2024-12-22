const Admin = require('../models/admin');

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Checks the username
        const admin = await Admin.findOne({ username });
        const confirmpassword = await Admin.findOne({ password });

        console.log({ admin }, { confirmpassword });

        res.status(200).json({ message: 'Login succesfull' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAdmin = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handler for creating admin

const createAdmin = async (req, res) => {
    const { firstname, lastname, birthdate, age, email, username, password, address } = req.body;

    try {
        const newAdmin = new Admin({
            firstname,
            lastname,
            birthdate,
            age,
            email,
            username,
            password,
            address
        })

        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(502).json({ message: error.message });
    }
};

module.exports = { getAdmin, createAdmin, loginUser };