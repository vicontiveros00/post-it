'use client';

import './globals.css';
import { useEffect, useState } from 'react';

const CheckApi = () => {
    const [apiStatus, setApiStatus] = useState('checking...');

    useEffect(() => {
        //Interesting thing, you're probably wondering why I wouldn't just use res.ok to set the API status but it flat out doesn't work. Fetch API and appDir are still expiremnetal in Next.js I've already gotten ahold of the Pocketbase and Next.js guys to see what's going on. This solution, although a bit cheesy, appears to works fine for now. This is defined as a client rendered component but is still server-side rendering, therefore making checkApi a bit buggy. Any API response has an empty body, status code of 0, and ok set to false.
        const checkApiStatus = async() => {
            try {
                const res = await fetch('https://notesapi.fly.dev/api/collections/notes/records/', {
                    cache: 'no-store',
                    mode: 'no-cors'
                });
                setApiStatus(res ? 'online' : 'offline');
            } catch (err) {
                setApiStatus('offline');
                throw new Error(err);
            }
        }
        checkApiStatus();
    }, [])

    const getStatusText = () => {
        if (apiStatus === 'online') {
            return 'You are able to view and post notes normally.';
        } else if (apiStatus === 'checking...') {
            return '';
        } else {
            return 'API is currently down. You cannot view of post notes. Should this issue persist, please contact me through the link above.'
        }
    }

    return (
        <>
            <h1 className={apiStatus}>{apiStatus}</h1>
            <p>{getStatusText()}</p>
        </>
    )
}

export default CheckApi;