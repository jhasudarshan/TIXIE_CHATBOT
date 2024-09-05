import axios from 'axios';
import host_url from '../constant';
import { useState } from 'react';

const useChatHandler = async(message) => {
    try {
        const resp = await axios.post(`${host_url}/chat_bot`,{
            message
        }, {
            headers: { "Content-Type": "application/json" }
        });
        console.log(resp);
        return resp.data.response;
    } catch (error) {
        console.log(`Error message: ${error}`);
    }
}

export {
    useChatHandler
}