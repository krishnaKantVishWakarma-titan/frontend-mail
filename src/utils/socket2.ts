"use client";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function MyComponent() {
    const [socket, setSocket] = useState<any>(null);
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {
        if (!socket) {
            const newSocket = io('http://localhost:3001'); // Replace with your server URL
            setSocket(newSocket);
        }

        // Handle incoming messages
        socket.on('message', (data: any) => {
            setMessages((prevMessages: any) => [...prevMessages, data]);
        });

        // Clean up connection on component unmount
        return () => socket && socket.disconnect();
    }, [socket]);

    // Send messages to the server
    const sendMessage = (message: any) => {
        if (socket) {
            socket.emit('message', message);
        }
    };

    
}