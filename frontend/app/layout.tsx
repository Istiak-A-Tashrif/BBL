import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biswas Builders Limited",
  description:
    "Biswas Builders Limited is a Bangladeshi real estate and construction company established in 1994.",
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
