export const paymentConfig = {

  PayPal: {

    enabled: true,

    mode:
      "sandbox",

    currency:
      "USD"

  },


  Capitec: {

    enabled: true,

    method:
      "EFT / Bank Transfer",

    currency:
      "ZAR"

  },


  Card: {

    enabled: true,

    provider:
      "Gateway",

    currency:
      "USD"

  }

};
