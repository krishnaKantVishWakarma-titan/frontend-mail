import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function useWebSocket() {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [status, setStatus] = useState<any>({});
    const [tasks, setTasks] = useState<any>([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:4000');
        socket.onopen = () => console.log('WebSocket connection opened');
        socket.onclose = () => console.log('WebSocket connection closed');
        socket.onmessage = (event: any) => {
            const task = JSON.parse(event.data);
            setStatus((prevStatus: any) => ({ ...prevStatus, [task._id]: task }));
            setTasks((prevTasks: any) => [...prevTasks, task]);
        };
        setWs(socket);
        return () => socket.close();
    }, []);

    const scheduleTask = (task: any) => {
        if(ws) {
            ws.send(JSON.stringify({ action: 'scheduleTask', ...task }));
        }
    };

    const getTaskStatus = (taskId: any) => {
        if(ws) {
            ws.send(JSON.stringify({ action: 'getTaskStatus', taskId }));
        }
    };

    return { scheduleTask, getTaskStatus, status, tasks };
}
