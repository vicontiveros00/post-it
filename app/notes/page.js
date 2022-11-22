//import Link from 'next/link';
import CreateNote from './CreateNote';
import styles from './Notes.module.css';

async function getNotes() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records/?page=1&perPage=30', {
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
    const { title, content, username, created } = note || {};
    const date = new Date(created) || null;

    return (
        <div className={styles.note}>
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