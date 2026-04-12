import type { Metadata } from "next";
import { Inter, Raleway, Caveat } from "next/font/google";
import "./globals.css";
import Providers from "@/app/provider";
import Script from 'next/script'

import {arabicFont, ayahFont, arabicV1Font, surahFont} from "@/app/font";


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
  title: "tebuk. | Ulangkaji Hafazan Al-Quran | Quran Memorization Tool",
  description: 'Tebuk ayat secara rawak untuk ulangkaji hafazan Al-Quran. A free memorization practice tool for picking a surah, page, or juz and continue reciting it from memory.',
  keywords: ['tebuk', 'tebuk quran', 'tebuk hafalan', 'ulangkaji hafalan', 'hafazan al-quran', 'hifz', 'quran memorization', 'tebuk ayat', 'latihan hafazan', 'tebuk surah'],
  openGraph: {
    images: 'https://www.tebuk.app/api/og',
    title: "tebuk. | Ulangkaji Hafazan Al-Quran | Quran Memorization Tool",
    description: 'Tebuk ayat secara rawak untuk ulangkaji hafazan Al-Quran. A free memorization practice tool for picking a surah, page, or juz and continue reciting it from memory.',
    url: 'https://www.tebuk.app',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "tebuk. | Ulangkaji Hafazan Al-Quran | Quran Memorization Tool",
    description: 'Tebuk ayat secara rawak untuk ulangkaji hafazan Al-Quran. A free memorization practice tool for picking a surah, page, or juz and continue reciting it from memory.',
    images: ['https://www.tebuk.app/api/og'],
  },
};


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'tebuk.',
  url: 'https://www.tebuk.app',
  description: 'Tebuk ayat secara rawak untuk ulangkaji hafazan Al-Quran. A free memorization practice tool for picking a surah, page, or juz and continue reciting it from memory.',
  applicationCategory: 'EducationApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  inLanguage: ['en', 'ms', 'ar'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${surahFont.variable} ${caveat.variable} ${raleway.variable} ${arabicFont.variable} ${ayahFont.variable} ${arabicV1Font.variable}`}>
    <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js"  />
      </body>
    </html>
  );
}
