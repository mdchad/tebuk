import localFont from 'next/font/local'

export const arabicFont = localFont(
  {
    src: [{ path: '../public/fonts/uthmanic_hafs_v22.ttf', weight: '400' }],
    display: 'swap',
    variable: '--font-arabic'
  }
)

export const arabicV1Font = localFont(
  {
    src: [{ path: '../public/fonts/UthmanicHafs1Ver18.ttf', weight: '400' }],
    display: 'swap',
    variable: '--font-arabicV1'
  }
)

export const ayahFont = localFont(
  {
    src: [{ path: '../public/fonts/uthmanic_hafs_v22.ttf', weight: '400' }],
    display: 'block',
    variable: '--font-ayah',
  }
)

export const surahFont = localFont(
  {
    src: [{ path: '../public/fonts/surah-names/v1/sura_names.woff2' }],
    display: 'swap',
    variable: '--font-surah',
  }
)



// export const arabicSymbolFont = localFont(
//   {
//     src: '../public/fonts/kfgqpc-arabic-symbols.ttf',
//     display: 'swap',
//     variable: '--font-arabic-symbol'
//   }
// )