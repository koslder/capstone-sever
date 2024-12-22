const Admin = require('../models/admin');

const getAdmins = async (req, res) => {
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

module.exports = { getAdmin, createUser };