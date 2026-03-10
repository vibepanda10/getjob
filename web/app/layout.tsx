import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "GET THAT JOB",
  description: "Referral and interview-help matching app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 font-sans text-slate-100">
        <Nav />
        {children}
      </body>
    </html>
  );
}
