const Menu = require('../models/menu');



// Get all admin
const getMenu = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.status(200).json(menus)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Handler for creating admin
const createMenu = async (req, res) => {
    const { menuItem, price, estimatedTime, imageLink } = req.body;

    try {
        const newMenu = new Menu({
            menuItem,
            price,
            estimatedTime,
            imageLink
        })

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

// Get's admin by id
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