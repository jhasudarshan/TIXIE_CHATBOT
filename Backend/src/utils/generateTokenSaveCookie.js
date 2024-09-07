import jwt from "jsonwebtoken";

const generateAccessTokenAndSetCookie = async (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "10d",
	});

	res.cookie("chatbot-token", token, {
		maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
		httpOnly: true, // Prevents client-side access via JavaScript
		sameSite: "strict", // Strict cookie policy for cross-site requests
		secure: process.env.NODE_ENV === "production" ? true : false, // Only HTTPS in production
	});

	console.log('Cookie set:', token);
};

export default generateAccessTokenAndSetCookie;