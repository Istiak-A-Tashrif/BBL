import type { Metadata } from "next";

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

const stylesheets = [
  "/assets/css/bootstrap.min.css",
  "/assets/css/magnific-popup.css",
  "/assets/css/swiper-bundle.min.css",
  "/assets/css/font-awesome-pro.css",
  "/assets/css/spacing.css",
  "/assets/css/main.css",
];

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
        {stylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body className="tp-magic-cursor">{children}</body>
    </html>
  );
}
