'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Notes.module.css';

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false)

  const router = useRouter();

  const create = async() => {
    setIsUpdating(true)
    const username = userName || 'anonymous'

    await fetch('https://569a-85-156-145-51.eu.ngrok.io/api/collections/notes/records/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        username,
        content,
      }),
    });

    setContent('');
    setTitle('');
    setUserName('');
    setIsUpdating(false)

    router.refresh();
  }

  return (
      <div className={styles.formWrapper}>    
        <input
          className={styles.formTitle}
          type="text"
          maxLength="15"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={styles.userName}
          type="text"
          maxLength="15"
          placeholder="User Name (Optional)"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <textarea
          placeholder="Content * (150 max)" maxLength="150"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={styles.submitBG}>
        <button 
          disabled={isUpdating} 
          type="submit" 
          onClick={title && content ? create : undefined}>
            Create note
        </button>
        </div>
      </div>
  );
}