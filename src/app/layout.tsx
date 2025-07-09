import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner'
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "informatics shirt",
  description: "Develop by Technology Development Division, SMOIF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="vsc-initialized">
        <div className="min-h-screen content-center items-center overflow-hidden">
          <div className="flex items-center justify-center">{children}</div>
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
