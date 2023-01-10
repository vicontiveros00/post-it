'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Notes.module.css';
import { TailSpin } from 'react-loader-spinner';

export default function BreadCrumb(props) {
    const [ goingBack, setGoingBack] = useState(false);
    const [ goingForward, setGoingForward ] = useState(false);
    const [ goingToFirst, setGoingToFirst ] = useState(false);
    const [ goingToLast, setGoingToLast ] = useState(false);
    const spinner = (<TailSpin padding='200' height='15' width='15' color='#fff' />)
    let currentPage = props.currentPage;
    let lastPage = props.lastPage;
    
    return (
        <div className={styles.breadcrumb}>
            {currentPage > 2 &&
                <Link href={`notes/1`}>
                    <button onClick={() => setGoingToFirst(true)} className={styles.breadcrumbbutton}>
                    {goingToFirst ? spinner : '◄◄'}
                    </button>
                </Link>
            }
            {currentPage > 1 && 
                <Link href={`/notes/${currentPage - 1}`}>
                    <button onClick={() => setGoingBack(true)} className={styles.breadcrumbbutton}>
                        {goingBack ? spinner : '◄'}
                    </button>
                </Link>
            }
            <p className={styles.pageindicator}>{`${currentPage} of ${lastPage}`}</p>
            {currentPage != lastPage && 
                <Link href={`/notes/${Number(currentPage) + 1}`}>
                    <button onClick={() => setGoingForward(true)} className={styles.breadcrumbbutton}>
                        {goingForward ? spinner : '►'}
                    </button>
                </Link>
            }
            {currentPage < lastPage - 1 &&
                <Link href={`notes/${lastPage}`}>
                    <button onClick={() => setGoingToLast(true)} className={styles.breadcrumbbutton}>
                    {goingToLast ? spinner : '►►'}
                    </button>
                </Link>
            }
        </div>
    )
}