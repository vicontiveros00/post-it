'use client';

import './globals.css';
import { useState } from 'react';

export default function CheckApi() {
    const [apiStatus, setApiStatus] = useState('checking...');

    const checkApi = async() => {
            const response = await fetch('http://127.0.0.1:8090/api/collections/notes/records/', {
                method: 'GET',
                cache: 'no-cache',
                mode: 'no-cors'
            })
            !response.ok ? setApiStatus('online') : setApiStatus('offline')
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