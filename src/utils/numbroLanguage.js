import numbro from 'numbro';

// define a language
numbro.registerLanguage({
  languageTag: 'id-ID',
  // languageName: 'Bahasa Indonesia (Indonesia)',
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'RB',
    million: 'JT',
    billion: 'M',
    trillion: 'T',
  },
  ordinal: number => {
    return number === 1 ? 'pertama' : 'ke-';
  },
  currency: {
    symbol: 'Rp',
    position: 'prefix',
    code: 'IDR',
  },
  currencyFormat: {
    thousandSeparated: true,
    totalLength: 5,
    spaceSeparated: true,
    average: false,
  },
  formats: {
    fourDigits: {
      totalLength: 4,
      spaceSeparated: true,
      average: true,
    },
    fullWithTwoDecimals: {
      output: 'currency',
      mantissa: 2,
      spaceSeparated: true,
      thousandSeparated: true,
    },
    fullWithTwoDecimalsNoCurrency: {
      mantissa: 2,
      thousandSeparated: true,
    },
    fullWithNoDecimals: {
      output: 'currency',
      spaceSeparated: true,
      thousandSeparated: true,
      mantissa: 0,
    },
  },
});
