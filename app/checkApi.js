'use client';

import './globals.css';
import { useState } from 'react';

export default function CheckApi() {
    const [apiStatus, setApiStatus] = useState('checking...');

    const checkApi = async() => {
            const res = await fetch('https://178b-85-156-145-51.eu.ngrok.io/api/collections/notes/records/', {
                cache: 'no-cache',
                mode: 'no-cors'
            })
            if (res.ok) {
                setApiStatus('online')
            } else {
                setApiStatus('offline')
            }
        }
        
    
    checkApi();

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