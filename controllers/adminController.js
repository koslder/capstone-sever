const Admin = require('../models/admin');


// Get all admin
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
    const { firstname, lastname, birthdate, age, email, username, password, address, role } = req.body;

    try {
        const newAdmin = new Admin({
            firstname,
            lastname,
            birthdate,
            age,
            email,
            username,
            password,
            address,
            role
        })

        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(502).json({ message: error.message });
    }
};


// Delete by id
const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        await Admin.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: id,
            info: "Admin successfully deleted"
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: id,
            info: "Admin id not found"
        });
    }
}

// Get's admin by id
const getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        res.status(200).json({
            success: true,
            data: admin,
            message: id
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: id,
            info: "Id not found or Inavlid"
        });
    }
}


// Updates
const updateAdmin = async (req, res) => {
    const { id } = req.params;

    const admin = req.body;

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            data: updatedAdmin,
            info: "Updated successfully!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


module.exports = { getAdmin, createAdmin, deleteAdmin, getAdminById, updateAdmin };