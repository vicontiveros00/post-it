/* eslint-disable @next/next/no-head-element */
import Link from "next/link";
import './globals.css';

export default async function RootLayout({ children }) {
  async function getPageNumbers() {
    const res = await fetch('https://notesapi.fly.dev/api/collections/notes/records/?perPage=15', { //old url was https://notesapi.fly.dev/api/collections/notes/records/?page=1&perPage=30
        cache: 'no-store',
        mode: 'no-cors'
    });
    const data = await res.json();
    return data.totalPages;
  }

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Post It</title>
      </head>
      <body>
        <main>
          <nav>
            <Link href="/">
              Home
            </Link>
            <Link href={`/notes/${await getPageNumbers()}`}>
              Notes
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
