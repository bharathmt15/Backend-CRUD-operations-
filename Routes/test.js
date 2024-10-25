const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const {body, validationResult} = require("express-validator");
const router = express.Router();

// Route 1 Create a new user
router.post(
    "/",
    [
        body("name").isLength({min: 3}),
        body("ph_no").isLength({min: 10}).isNumeric(),
        body("password").isLength({min: 3}),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const salt = await bcrypt.genSalt(8);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = new User({
                name: req.body.name,
                ph_no: req.body.ph_no,
                password: hashedPassword,
            });

            await user.save();
            res.status(201).json({message: "User created successfully"});
            console.log(user);
        } catch (error) {
            res.status(500).json({error: "Failed to save user"});
        }
    }
);

// Route 2 Get user by phone number
router.get("/:ph_no", async (req, res) => {
    try {
        const user = await User.findOne({ph_no: req.params.ph_no});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch user"});
    }
});

// Route 3 Update user by phone number
router.put(
    "/:ph_no",
    [
        body("name").optional().isLength({min: 3}),
        body("ph_no").optional().isLength({min: 10}).isNumeric(),
        body("password").optional().isLength({min: 3}),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            let user = await User.findOne({ph_no: req.params.ph_no});
            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            if (req.body.password) {
                const salt = await bcrypt.genSalt(8);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }

            user = await User.findOneAndUpdate(
                {ph_no: req.params.ph_no},
                {$set: req.body},
                {new: true}
            );

            res.json(user);
        } catch (error) {
            res.status(500).json({error: "Failed to update user"});
        }
    }
);

// Route 4 Delete user by phone number
router.delete("/:ph_no", async (req, res) => {
    try {
        const user = await User.findOne({ph_no: req.params.ph_no});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        await User.deleteOne({ph_no: req.params.ph_no});
        console.log(user);
        res.json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete user"});
    }
});

module.exports = router;
