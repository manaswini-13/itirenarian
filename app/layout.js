import "@/app/globals.css";
import CustomCursor from "@/components/CustomCursor";
export const metadata = {
  title: "Itinerian — Illuminated Travel Itineraries",
  description:
    "AI-crafted travel itineraries with the soul of a Renaissance manuscript.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,500;1,400&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
