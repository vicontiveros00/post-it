'use client';

import './globals.css';
import { useState } from 'react';

export default function CheckApi() {
    const [apiStatus, setApiStatus] = useState('checking...');

    async function checkApi() {
            const res = await fetch('https://314a-85-156-145-51.eu.ngrok.io/api/collections/notes/records/', {
                method: 'GET',
                cache: 'no-cache',
                mode: 'no-cors'
            })
            console.log(res.ok);
            res.ok ? setApiStatus('online') : setApiStatus('offline')
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