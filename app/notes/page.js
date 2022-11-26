//import Link from 'next/link';
import CreateNote from './CreateNote';
import styles from './Notes.module.css';

async function getNotes() {
    const res = await fetch('https://notesapi.fly.dev/api/collections/notes/records/?page=1&perPage=30', {
        cache: 'no-store',
        mode: 'no-cors'
    });
    const data = await res.json();
    return data.items;
}

export default async function NotesPage() {
    const notes = await getNotes();

    return (
        <div>
            <h1>Notes</h1>
            <div className={styles.grid}>
            {notes.reverse().map((note) => {
                return <Note key={note.id} note={note} />
            })}
            </div>
            <CreateNote />
        </div>
    )
}

function Note({ note }) {
    const { title, content, username, notecolor, created, admin } = note || {};
    const date = new Date(created) || null;
    const adminGlow = `4px 4px 12px #fc8b8b, -4px -4px 12px #fc8b8b, 4px -4px 12px #fc8b8b, -4px 4px 12px #fc8b8b`;

    return (
        <div className={styles.note} style={{
            backgroundColor: notecolor ? notecolor : '#fff740',
            boxShadow: admin ?  adminGlow : ''
            }}>
            <h2>{title}</h2>
            <h6 className={styles.username}>{username}</h6>
            <h5>{content}</h5>
            <p>{date.toLocaleString('en-GB', {
                dateStyle: 'short',
                timeStyle: 'short'
            })}</p>
        </div>
    )
}