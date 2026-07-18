import type { Schema, Struct } from '@strapi/strapi';

export interface ProductSpecs extends Struct.ComponentSchema {
  collectionName: 'components_product_specs';
  info: {
    description: '';
    displayName: 'specs';
    icon: 'list';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface UiAccordion extends Struct.ComponentSchema {
  collectionName: 'components_ui_accordions';
  info: {
    description: '';
    displayName: 'accordion';
    icon: 'menu';
  };
  attributes: {
    content: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'product.specs': ProductSpecs;
      'ui.accordion': UiAccordion;
    }
  }
}
