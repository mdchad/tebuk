"use client";

function getUnicodeCharacter(n: number) {
  const baseHex = 'FC00';
  const baseDecimal = parseInt(baseHex, 16);
  const targetDecimal = baseDecimal + (n - 1);
  const targetHex = targetDecimal.toString(16).toUpperCase();
  const unicodeCharacter = String.fromCodePoint(parseInt(targetHex, 16));
  return unicodeCharacter;
}


const Ayah = ({ data }: any) => {
  return (
    <p lang="ar" dir="rtl" className="font-arabic text-3xl leading-loose">{data.verse.text_imlaei}<span>{getUnicodeCharacter(data.verse.verse_number)}</span></p>
  );
};

export default Ayah;