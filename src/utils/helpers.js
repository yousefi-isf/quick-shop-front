import pn from 'persian-number';

export default {
  toCurrency(price) {
    return pn.convertEnToPe(price.toLocaleString());
  },
};
