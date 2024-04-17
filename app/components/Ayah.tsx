"use client";

const Ayah = ({ data }) => {
  console.log('dataaa', data)
  return (
    <p lang="ar" dir="rtl" className="text-justify font-arabic text-3xl leading-loose">{data.verse.text_imlaei}</p>
  );
};

export default Ayah;