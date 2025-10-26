export const logger = async (ctx: any, next: () => Promise<void>) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
};