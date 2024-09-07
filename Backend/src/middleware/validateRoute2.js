import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

const validateRoute2 = async (req, res, next) => {
    try {
        const {message} = req.body;
        const token = req.cookies['chatbot-token'];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Token does not exist" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userId = user._id;
        req.body = {userId,message};
        next();
    } catch (error) {
        console.error("Error in validateRoute middleware: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default validateRoute2;