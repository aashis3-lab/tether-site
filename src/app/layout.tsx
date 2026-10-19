import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { SITE_URL } from "@/config";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tether: go out together, come home together",
  description:
    "Tether keeps your group synced on a night out and alerts you if someone drifts off. One night of location sharing that watches out for everyone.",
  openGraph: {
    title: "Tether",
    description: "Go out together. Come home together.",
    images: ["/screens/map-peek.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}
