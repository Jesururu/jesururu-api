import type { Schema, Struct } from '@strapi/strapi';

export interface EventTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_event_team_members';
  info: {
    displayName: 'TeamMember';
  };
  attributes: {
    Bio: Schema.Attribute.Text;
    Name: Schema.Attribute.String;
    Photo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Role: Schema.Attribute.String;
  };
}

export interface LinksPurchaseOption extends Struct.ComponentSchema {
  collectionName: 'components_links_purchase_options';
  info: {
    displayName: 'PurchaseOption';
  };
  attributes: {
    Link: Schema.Attribute.String;
    Platform: Schema.Attribute.String;
    PriceLabel: Schema.Attribute.String;
    Type: Schema.Attribute.Enumeration<['Physical', 'Ebook', 'Audiobook']>;
  };
}

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
      'event.team-member': EventTeamMember;
      'links.purchase-option': LinksPurchaseOption;
      'pricing.currency-price': PricingCurrencyPrice;
    }
  }
}
