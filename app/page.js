import CheckApi from "./checkApi";
import styles from './notes/Notes.module.css';


export default function HomePage() {
return (
        <div>
            <h1>Post It</h1>
            <p>Coded with love by <a href="https://github.com/vicontiveros00">github/vicontiveros00</a></p>
            <div className={styles.note} style={{
                backgroundColor: 'rgb(255, 247, 64)'
            }}>
                <h5>Welcome to the anonymous message board where you can write whatever you want on a post it note and share it to the world.</h5>
                <br />
                <br />
            </div>
            <p>Some Rules:</p>
            <ul>
                <li>No hate</li>
                <li>No spam</li>
                <li>No politics</li>
                <li>Try to keep it SFW</li>
                <li>Be respectful</li>
            </ul>
            <p>Please report any bugs <a target="_blank" href="https://vicontiveros00.github.io/#contact">here</a>.</p>
            <h1>Server Status:</h1>
            <CheckApi />
            <small>v. 0.3.4 alpha</small>
        </div>
    )
}