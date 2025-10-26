export class MainController {
    getHome(context: any) {
        context.response.body = { message: "Welcome to the Home Page!" };
    }

    getAbout(context: any) {
        context.response.body = { message: "This is the About Page." };
    }
}