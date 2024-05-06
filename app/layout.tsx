import type { Metadata } from "next";
import { Inter, Raleway, Caveat } from "next/font/google";
import "./globals.css";
import Providers from "@/app/provider";
import Script from 'next/script'

import {arabicFont, ayahFont, arabicV1Font} from "@/app/font";


const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({
  weight: ['400', '700'],
  variable: '--font-raleway',
  style: ['normal', 'italic'],
  subsets: ["latin"]
});

const caveat = Caveat({
  weight: ['400', '700'],
  variable: '--font-caveat',
  style: ['normal'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tebuk.app'),
  title: "tebuk. | Practice Daily with Random Verses",
  description: "Step up your Quran learning with our memorization tool. Generate random verses to memorize and recite, improving fluency over time",
  openGraph: {
    // images: process.env.NODE_ENV === 'production' ? 'https://www.tebuk.app/api/og' : 'http://localhost:3000/api/og',
    // images: '',
    title: 'tebuk. | Practice Daily with Random Verses',
    description: 'Step up your Quran learning with our memorization tool. Generate random verses to memorize and recite, improving fluency over time',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caveat.variable} ${raleway.variable} ${arabicFont.variable} ${ayahFont.variable} ${arabicV1Font.variable}`}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js"  />
      </body>
    </html>
  );
}
