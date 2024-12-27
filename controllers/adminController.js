const Admin = require('../models/admin');

// const loginUser = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         // Check if the username exists
//         const admin = await Admin.findOne({ username });
//         if (!admin) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Compare passwords directly (not recommended for production)
//         if (admin.password !== password) {
//             return res.status(401).json({ message: 'Invalid Password' });
//         }

//         // If username and password match
//         res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

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