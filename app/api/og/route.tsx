import { ImageResponse } from 'next/og';
import {loadGoogleFont} from "@/lib/utils";
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET() {
  const font1 = await fetch(
    new URL("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap", import.meta.url)
  );

  const text = 't.'
  const fontData = await loadGoogleFont('Caveat', 't.');

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          fontWeight: 700,
          fontFamily: 'Caveat',
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {text}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Caveat",
          data: fontData,
          style: "normal",
        },
      ]
    }
  );
}