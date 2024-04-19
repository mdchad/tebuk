import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import Providers from "@/app/provider";

import {arabicFont, ayahFont, arabicV1Font} from "@/app/font";


const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({
  weight: ['400', '700'],
  variable: '--font-raleway',
  style: ['normal', 'italic'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "tebuk.",
  description: "Strengthen your memory",
  openGraph: {
    images: process.env.NODE_ENV === 'production' ? 'https://www.tebuk.app/api/og' : 'http://localhost:3000/api/og',
    // title: 'Challenge yourself to test your memory on Quran',
    // description: 'Challenge yourself to test your memory on Quran',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${arabicFont.variable} ${ayahFont.variable} ${arabicV1Font.variable}`}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
