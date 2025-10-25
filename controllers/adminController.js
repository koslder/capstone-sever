const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all admin
const getAdmin = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handler for creating admin
const createAdmin = async (req, res) => {
    try {
        const { firstname, lastname, birthdate, age, email, username, password, address, role } = req.body;

        // Input validation
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }
        // Input validation
        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username is required'
            });
        }
        // Input validation
        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'Password is required'
            });
        }

        // Check if the username or email already exists
        const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin with hashed password
        const newAdmin = new Admin({
            firstname,
            lastname,
            birthdate,
            age: parseInt(age) || 0,
            email,
            username,
            password: hashedPassword,
            address,
            role: role || 'user'
        });

        // Save to database
        const savedAdmin = await newAdmin.save();

        // Return success without sensitive data
        res.status(201).json({
            success: true,
            data: {
                id: savedAdmin._id,
                firstname: savedAdmin.firstname,
                lastname: savedAdmin.lastname,
                email: savedAdmin.email,
                username: savedAdmin.username,
                role: savedAdmin.role
            }
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        // Send more detailed error message in development
        res.status(500).json({
            success: false,
            message: 'Server error while creating admin',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
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
            info: "Admin successfully deleted",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: id,
            info: "Admin ID not found",
        });
    }
};

// Get admin by id
const getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        res.status(200).json({
            success: true,
            data: admin,
            message: id,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: id,
            info: "ID not found or invalid",
        });
    }
};

// Updates admin
const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const admin = req.body;

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            data: updatedAdmin,
            info: "Updated successfully!",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Login admin
// Login admin
const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found!"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.status(200).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                firstname: admin.firstname,
                lastname: admin.lastname,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAdmin,
    createAdmin,
    deleteAdmin,
    getAdminById,
    updateAdmin,
    loginAdmin, // Ensure loginAdmin is exported
};
