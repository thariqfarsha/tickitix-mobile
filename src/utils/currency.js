import 'intl';
import 'intl/locale-data/jsonp/id-ID';

const currency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export default currency;
