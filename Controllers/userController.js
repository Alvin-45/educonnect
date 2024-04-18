const users = require("../Models/userModel");

exports.register=async (req,res)=>{
    console.log("Inside Register Request");
    console.log(req.body);
    const { firstName, lastName, address, mobile, email, gender, dob, course, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(406).json("User already exists!!!");
        } else {
            const newUser = new users({
                firstName,
                lastName,
                address,
                mobile,
                email,
                gender,
                dob,
                course,
                password
            });
            
            await newUser.save();
            
            return res.status(200).json(newUser);
    }
 } catch (err) {
        return res.status(401).json(err);
    }

    
};

exports.allstudentdetails = async (req, res) => {
    try {
        console.log("Inside Get All Users request function!!!");
        const allUsers = await users.find();
        res.status(200).json(allUsers);
    } catch (err) {
        console.error("Error fetching all users:", err);
        res.status(500).json({ error: "Error fetching all users" });
    }
};

exports.removestudent = async (req, res) => {
    try {
        console.log("Inside Delete User request function!!!");
        console.log(_id);
        const { id } = req.params;
        const deletedUser = await users.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json("User not found");
        }
        res.status(200).json(deletedUser);
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Error deleting user" });
    }
};

