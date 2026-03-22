import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prompto | Prompt Engineering Workspace",
  description: "High-fidelity prompt design and optimization platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-accent/30 transition-colors duration-300 min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
