/* eslint-disable @next/next/no-head-element */
import Link from "next/link";
import './globals.css';

const RootLayout = async({ children }) => {
  const getPageNumbers = async() => {
    const res = await fetch('https://notesapi.fly.dev/api/collections/notes/records/?perPage=15', {
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1" />
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

export default RootLayout;
