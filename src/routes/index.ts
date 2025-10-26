export function setRoutes(app: any) {
  app.get("/", (ctx: any) => {
    ctx.response.body = "Welcome to the Home Page!";
  });

  app.get("/about", (ctx: any) => {
    ctx.response.body = "This is the About Page!";
  });
}