import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkHub — Your Link in Bio",
  description: "Create your personalized link-in-bio page with analytics, themes, and QR codes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
