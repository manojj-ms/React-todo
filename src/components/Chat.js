import React from 'react';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3000");

// socket.connect("Welcome", (data) => {
//     console.log("Received", data);
// })

const Chat = () => {
    return (
        <div>
            <h1>Welcome to Chat!</h1>
        </div>
    )
}

export default Chat;