/* eslint-disable @next/next/no-head-element */
import Link from "next/link";
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Post It</title>
      </head>
      <body>
        <nav>
            <h1 className="nav-header">
              Note app
            </h1>
              <div>
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
