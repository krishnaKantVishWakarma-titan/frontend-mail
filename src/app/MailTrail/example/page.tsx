"use client"
import { useEffect, useState } from 'react';

const Home = () => {
    const [message, setMessage] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3001');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event: MessageEvent) => {
            setResponse(event.data);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = () => {
        if (ws) {
            ws.send(message);
        }
    };

    return (
        <div>
            <h1>WebSocket Example</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <p>Response: {response}</p>
        </div>
    );
};

export default Home;
