"use client";

const Ayah = ({ data }: any) => {
  return (
    <p lang="ar" dir="rtl" className="text-justify font-arabic text-3xl leading-loose">{data.verse.text_imlaei}</p>
  );
};

export default Ayah;