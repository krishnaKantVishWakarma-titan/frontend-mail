"use client";

import { useState } from 'react';
import useWebSocket from '@/utils/socket';

export default function Home() {
    const [emails, setEmails] = useState('krishnakantvish.24@gmail.com');
    const [subject, setSubject] = useState('asd');
    const [body, setBody] = useState('asd');
    const [scheduledFor, setScheduledFor] = useState('');
    const { scheduleTask, getTaskStatus, status, tasks } = useWebSocket();

    const handleSubmit = () => {
      alert("clicked")
        const emailArray = emails.split(',').map(email => email.trim());
        scheduleTask({ emails: emailArray, subject, body, scheduledFor });
    };

    return (
        <div>
            <div>
                <div>
                    <label>Emails (comma separated):</label>
                    <input type="text" className='border border-black' value={emails} onChange={(e) => setEmails(e.target.value)} required />
                </div>
                <div>
                    <label>Subject:</label>
                    <input type="text" className='border border-black' value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea value={body} className='border border-black' onChange={(e) => setBody(e.target.value)} required />
                </div>
                <div>
                    <label>Scheduled For:</label>
                    <input type="datetime-local" className='border border-black' value={scheduledFor} onChange={(e) => setScheduledFor(e.target.value)} required />
                </div>
                <button className='bg-blue-500 px-3 py-2 mt-5 text-white rounded-sm' onClick={handleSubmit}>Schedule Task</button>
                <button className='bg-blue-500 px-3 py-2 mt-5 text-white rounded-sm' onClick={getTaskStatus}>refresh</button>
            </div><br/ >
            <h2>Scheduled Tasks</h2>
            <ul>
                {tasks.map((task: any) => (
                    <li key={task._id}>
                        <p>Email: {task.emails.join(', ')}</p>
                        <p>Subject: {task.subject}</p>
                        <p>Status: {status[task._id]?.status || 'queued'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
