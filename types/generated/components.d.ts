import type { Schema, Struct } from '@strapi/strapi';

export interface PricingCurrencyPrice extends Struct.ComponentSchema {
  collectionName: 'components_pricing_currency_prices';
  info: {
    displayName: 'CurrencyPrice';
  };
  attributes: {
    Amount: Schema.Attribute.Decimal;
    Currency: Schema.Attribute.Enumeration<['USD', 'NGN', 'GBP', 'EUR', 'CAD']>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'pricing.currency-price': PricingCurrencyPrice;
    }
  }
}
