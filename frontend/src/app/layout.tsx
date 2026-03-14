import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WelcomePopup from "@/components/ui/WelcomePopup";
import VisitorCounter from "@/components/ui/VisitorCounter";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Prakash Agency | Quality FMCG Distribution — Jharkhand",
    template: "%s | Prakash Agency",
  },
  description: "Prakash Agency is Jharkhand's most trusted FMCG distributor. We supply 500+ quality products from India's top brands to 1,200+ retailers across 15+ cities. Quality you trust. Delivered to your door.",
  keywords: ["FMCG distributor", "Prakash Agency", "packaged food", "beverages", "personal care", "household products", "Jharkhand", "Latehar", "wholesale", "retail distribution"],
  authors: [{ name: "Prakash Agency" }],
  openGraph: {
    title: "Prakash Agency | Quality FMCG Distribution — Jharkhand",
    description: "Jharkhand's most trusted FMCG distributor. 500+ products · 1,200+ partners · Est. 2005. Quality you trust. Delivered to your door.",
    type: "website",
    locale: "en_IN",
    siteName: "Prakash Agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prakash Agency | Quality FMCG Distribution",
    description: "Jharkhand's most trusted FMCG distributor. 500+ products, 1,200+ partners, Est. 2005.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <WelcomePopup />
          <VisitorCounter />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{ style: { background: "#1a1a1a", color: "#fff", border: "1px solid #333" } }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
