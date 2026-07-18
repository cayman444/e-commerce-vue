/**
 * `products-populate` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => any) => {
    ctx.query.populate = ["image", "specs", "accordions"];
    strapi.log.info("In products-populate middleware.");

    await next();
  };
};
