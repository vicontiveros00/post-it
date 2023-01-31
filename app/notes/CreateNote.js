'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TailSpin } from 'react-loader-spinner';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [notecolor, setNoteColor] = useState('#fff740');
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
        notecolor
      }),
    });

    setContent('');
    setTitle('');
    setUserName('');
    setNoteColor('#fff740')
    setIsUpdating(false)

    router.refresh();
  }

  return (
    <div>
      <h3>Add a new note:</h3>
      <input
        type="text"
        maxLength="30"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        maxLength="30"
        placeholder="User Name (Optional)"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <textarea
        placeholder="Content * (300 max)" maxLength="300"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <label>Select color: </label>
      <input
        type="radio"
        name="colors"
        id="yellow"
        value="#fff740"
        defaultChecked
        onChange={(e) => setNoteColor(e.target.value)}
      />
      <input
        type="radio"
        name="colors"
        id="blue"
        value="#7afcff"
        onChange={(e) => setNoteColor(e.target.value)}
      />
      <input
        type="radio"
        name="colors"
        id="green"
        value="#82ffa3"
        onChange={(e) => setNoteColor(e.target.value)}
      />
      <input
        type="radio"
        name="colors"
        id="pink"
        value="#ff7eb9"
        onChange={(e) => setNoteColor(e.target.value)}
      /> <br />
      <button disabled={isUpdating} type="submit" onClick={() => {
        if (title && content && title.length <= 30 && content.length <= 300 && userName.length <= 30) {
          create();
        }
      }}>
        {isUpdating ? <TailSpin padding='200' height='15' width='15' color='#fff' /> : 'Create Note'}
      </button>
    </div>
  );
}

export default CreateNote;