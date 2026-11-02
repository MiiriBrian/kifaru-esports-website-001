import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteUrl, team } from "@/data/site";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const description =
  "Kifaru Esports (KFR): a League of Legends team from Nairobi, Kenya. Meet the roster, follow matches and join the community.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kifaru Esports | League of Legends Team, Kenya",
    template: "%s | Kifaru Esports",
  },
  description,
  keywords: [
    "Kifaru Esports",
    "KFR",
    "League of Legends",
    "Kenya esports",
    "East Africa esports",
    "Nairobi",
  ],
  openGraph: {
    title: "Kifaru Esports",
    description,
    url: siteUrl,
    siteName: "Kifaru Esports",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kifaru Esports",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#12140a" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: team.name,
  alternateName: team.short,
  sport: "Esports (League of Legends)",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}