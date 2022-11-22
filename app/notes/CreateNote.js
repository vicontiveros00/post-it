'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false)

  const router = useRouter();

  const create = async() => {
    setIsUpdating(true)
    const username = userName || 'anonymous'

    await fetch('https://c8b8-85-156-145-51.eu.ngrok.io/api/collections/notes/records/', {
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
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Name (Optional)"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <textarea
        placeholder="Content *" maxLength="300"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button disabled={isUpdating} type="submit" onClick={title && content ? create : undefined}>
        Create note
      </button>
    </div>
  );
}