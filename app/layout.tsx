import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "coal.ui — Built on a grid. Made to feel alive.",
  description:
    "React components with crisp structure, organic forms made of small squares, and soft tactile motion. Explore the catalog and install the standalone library.",
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
