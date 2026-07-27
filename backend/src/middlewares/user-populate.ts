import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => any) => {
    if (ctx.path === "/api/users/me") {
      ctx.query = {
        ...ctx.query,
        populate: ["role"],
      };
    }

    await next();
  };
};
