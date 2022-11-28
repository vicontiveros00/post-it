'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Notes.module.css';
import { TailSpin } from 'react-loader-spinner';

export default function BreadCrumb(props) {
    const [ goingBack, setGoingBack] = useState(false);
    const [ goingForward, setGoingForward ] = useState(false);
    const spinner = (<TailSpin padding='200' height='15' width='15' color='#fff' />)
    let currentPage = props.currentPage;
    let lastPage = props.lastPage;
    
    return (
        <div className={styles.breadcrumb}>
            {currentPage > 1 && 
                <Link href={`/notes/${currentPage - 1}`}>
                    <button onClick={() => setGoingBack(true)} className={styles.breadcrumbbutton}>
                        {goingBack ? spinner : '◄'}
                    </button>
                </Link>}
            {}
            <p>{`Page ${currentPage} of ${lastPage}`}</p>
            {currentPage != lastPage && 
                <Link href={`/notes/${Number(currentPage) + 1}`}>
                    <button onClick={() => setGoingForward(true)} className={styles.breadcrumbbutton}>
                        {goingForward ? spinner : '►'}
                    </button>
                </Link>}
            {}
        </div>
    )
}