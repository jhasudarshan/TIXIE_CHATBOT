import { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import host_url from '../constant.js';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ name, email, password, confirmPassword }) => {
        const success = handleInputErrors({ name, email, password, confirmPassword });
        if (!success) {
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${host_url}/signup`, {
                name,
                email,
                password,
                confirmPassword,
            }, {
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.data;

            console.log("API Response:", data);

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            await setAuthUser(data);
            alert('Signup successful');

            // Refresh the page after successful signup
            window.location.reload();

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
}

function handleInputErrors({ name, email, password, confirmPassword }) {
    if (!name || !email || !password || !confirmPassword) {
        alert("All fields are required");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return false;
    }
    return true;
}

export default useSignup;
