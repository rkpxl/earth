"use client";
import "./globals.css";
import { darkTheme } from "./theme/themes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Providers } from './Redux/Provider'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>ERS</title>
        <meta name="description" content="ERS" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <body>
          <Providers>{children}</Providers>
        </body>
      </ThemeProvider>
    </html>
  );
}