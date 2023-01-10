import CreateNote from '../CreateNote';
import BreadCrumb from '../BreadCrumb';
import styles from '../Notes.module.css';

async function getNotes(page) {
    const res = await fetch(`https://notesapi.fly.dev/api/collections/notes/records/?page=${page}&perPage=15`, {
        cache: 'no-store',
        mode: 'no-cors'
    });
    const data = await res.json();
    return data;
}

export default async function NotesPage({ params }) {
    const notes = await getNotes(params.page);
    let currentPage = params.page;
    let lastPage = notes.totalPages;
    const mainContent = (
        <div className={styles.grid}>
            {notes.items.reverse().map((note) => {
                return <Note key={note.id} note={note} />
            })}
        </div>
    )
    return (
        <div>
            <h1>{`Page ${currentPage} of Notes`}</h1>
            <div className={styles.mobileTransform}>
                {mainContent}
                {currentPage == lastPage && <CreateNote />}
            </div>
            <BreadCrumb currentPage={currentPage} lastPage={lastPage} />
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
            <p>{date.toLocaleString('fi-FI', {
                dateStyle: 'short',
                timeStyle: 'short'
            })}</p>
        </div>
    )
}