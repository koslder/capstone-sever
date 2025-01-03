const Menu = require('../models/menu');

// Get all menu items
const getMenu = async (req, res) => {
    try {
        const menus = await Menu.find(); // Fetch all menu items from the database

        // Return the menus in JSON format with a 200 OK status
        res.status(200).json({
            success: true,
            message: "Menu items retrieved successfully",
            data: menus
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching menu items:", error);

        // Return an error message with a 500 status
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const createMenu = async (req, res) => {
    const { menuItem, price, estimatedTime, imageLink } = req.body;

    try {
        const newMenu = new Menu({
            menuItem,
            price,
            estimatedTime,
            imageLink
        });

        // console.log("New menu item to be saved:", newMenu); // Debug log

        await newMenu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(502).json({ message: error.message });
    }
};

// Delete by id
const deleteMenu = async (req, res) => {
    const { id } = req.params;

    try {
        await Menu.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: id,
            info: "Menu successfully deleted"
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: id,
            info: "Menu id not found"
        });
    }
}

// Get's menu by id
const getMenuById = async (req, res) => {
    const { id } = req.params;

    try {
        const menu = await Menu.findById(id);
        res.status(200).json({
            success: true,
            data: menu,
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
const updateMenu = async (req, res) => {
    const { id } = req.params;

    const menu = req.body;

    try {
        const updatedMenu = await Menu.findByIdAndUpdate(id, menu, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            data: updatedMenu,
            info: "Updated successfully!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


module.exports = { getMenu, createMenu, deleteMenu, getMenuById, updateMenu };