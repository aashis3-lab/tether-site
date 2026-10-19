import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Footer, Nav } from "@/components/SiteChrome";
import { SITE_URL } from "@/config";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tether: go out together, come home together",
    template: "%s · Tether",
  },
  description:
    "The group chat that actually has your back. Tether keeps your group synced on a night out, checks on anyone who drifts off, and deletes the location data by morning.",
  openGraph: {
    title: "Tether · Stay tether.",
    description: "Go out together. Stay tether. Come home together.",
    images: ["/brand/logo-mark.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme is set by the inline script before paint, so React must accept the DOM value.
    <html lang="en" className={`${geist.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
