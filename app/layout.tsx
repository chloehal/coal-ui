import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "coal.ui — Quietly distinctive components",
  description:
    "A warm, minimal React component library. Explore working examples, copy source, and install the standalone React package.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="root">{children}</div>
      </body>
    </html>
  );
}
