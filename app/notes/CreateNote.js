'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TailSpin } from 'react-loader-spinner';
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

    await fetch('https://notesapi.fly.dev/api/collections/notes/records/', {
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
    <div>
      <h3>Create a new Note</h3>
      <input
        type="text"
        maxLength="15"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
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
      <button disabled={isUpdating} type="submit" onClick={title && content ? create : undefined}>
        {isUpdating ? <TailSpin padding='200' height='15' width='15' color='#fff' /> : 'Create Note'}
      </button>
        
    </div>
  );
}