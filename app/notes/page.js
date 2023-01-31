"use client"
import Link from "next/link";

const NotesPage = () => {

    return (
        <>
            <h1>You found an easter egg!</h1>
            <p>You shouldn't normally be navigated to this page.</p>
            <img width="200" src="https://www.pngmart.com/files/12/Single-Easter-Egg-PNG-HD.png" /><br />
            <Link href='/'>Return home</Link>
        </>
    )
}

export default NotesPage;