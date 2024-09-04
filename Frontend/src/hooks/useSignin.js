import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import host_url from "../constant";

const useSignin =  () => {
    const [ loading, setLoading ] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signin = async ({  email, password }) => {
        console.log(email)
        const success = handleInputErrors({  email, password });
        if( !success){
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${host_url}/login`, {
                email,
                password
            }, {
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.data; // Ensure you get the correct data

            // Assuming res.data contains a 'token' and other user data
            console.log("API Response:", data);

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            await setAuthUser(data);
            alert(`login successfull`);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);   
        }
    };

    return { loading, signin };
}

function handleInputErrors({ email, password }) {
    if( !email && !password){
        alert('all field are required');
        return false;
    }

	return true;
}

export {
    useSignin
}