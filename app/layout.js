/* eslint-disable @next/next/no-head-element */
import Link from "next/link";
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>
            <h1 className="nav-header">
              Note app
            </h1>
            <div className="nav-items">
              <Link href="/">
                Home
              </Link>
              <Link href="/notes">
                Notes
              </Link>
            </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
