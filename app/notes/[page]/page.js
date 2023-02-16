import CreateNote from '../CreateNote';
import BreadCrumb from '../BreadCrumb';
import styles from '../Notes.module.css';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const notesPerPage = 15;

const getNotes = async(page) => {
    const res = await fetch(`https://notesapi.fly.dev/api/collections/notes/records/?page=${page}&perPage=${notesPerPage}`, {
        cache: 'no-store',
        mode: 'no-cors'
    });
    const data = await res.json();
    return data;
}

const NotesPage = async({ params }) => {
    const notes = await getNotes(params.page);
    let currentPage = params.page;
    let lastPage = notes.totalPages;
    let numOfRenderedNotes = 0;
    const userOnActivePage = currentPage == lastPage;


    const mainContent = (
        <div className={styles.grid}>
            {notes.items.reverse().map((note) => {
                numOfRenderedNotes++;
                return <Note key={note.id} note={note} />
            })}
        </div>
    )
    return (
        <div>
            <h1>{`Page ${currentPage} of Notes`}</h1>
            <div className={styles.mobileTransform}>
                {mainContent}
                {userOnActivePage && <CreateNote />}
            </div>
            <BreadCrumb currentPage={currentPage} lastPage={lastPage} />
            {userOnActivePage && <small>{numOfRenderedNotes}/{notesPerPage}</small>}
        </div>
    )
}

const Note = ({ note }) => {
    const { title, content, username, notecolor, created, admin } = note || {};
    const date = new Date(created) || null;
    const adminGlow = '4px 4px 12px #fc8b8b, -4px -4px 12px #fc8b8b, 4px -4px 12px #fc8b8b, -4px 4px 12px #fc8b8b';

    return (
        <div className={styles.note} style={{
            backgroundColor: notecolor ? notecolor : '#fff740',
            boxShadow: admin ?  adminGlow : ''
            }}>
            <h2>{title}</h2>
            <h6 className={styles.username}>{username}</h6>
            <h5>
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </h5>
            <p>{date.toLocaleString('fi-FI', {
                dateStyle: 'short',
                timeStyle: 'short'
            })}</p>
        </div>
    )
}

export default NotesPage