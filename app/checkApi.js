'use client';

import './globals.css';
import { useState } from 'react';

export default function CheckApi() {
    const [apiStatus, setApiStatus] = useState('checking...');

    const checkApiStatus = async() => {
        try {
            await fetch('https://notesapi.fly.dev/api/collections/notes/records/', {
                cache: 'no-store',
                mode: 'no-cors'
            });
            setApiStatus('online');
        } catch (err) {
            setApiStatus('offline');
            console.log(err);
        }
    }

    checkApiStatus();

    const getStatusText = () => {
        if (apiStatus === 'online') {
            return 'You are able to view and post notes normally.';
        } else if (apiStatus === 'checking...') {
            return '';
        } else {
            return 'API is currently down. You cannot view or post notes. Check back later. My electric bill would be massive if this was online constantly.'
        }
    }

    return (
        <>
            <h1 className={apiStatus}>{apiStatus}</h1>
            <p>{getStatusText()}</p>
        </>
    )
}